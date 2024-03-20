import Action from "./entities/Action";
import AggregatedLicenseV2 from "./entities/AggregatedLicenseV2";
import { CheckResult, SingleCheckResult } from "./entities/CheckResult";
import CombinedLicense from "./entities/CombinedLicense";
import License from "./entities/License";
import { join } from "./helpers";
import LicenseFinder from "./licenseFinder";

class Checks {
    licenseFinder: LicenseFinder

    constructor() {
        this.licenseFinder = new LicenseFinder();
    }

    canfulfillDuties(prohibitions: Action[], duties: Action[]): boolean {
        let dutiesAreNotProhibited = join(prohibitions, duties).length == 0;

        return dutiesAreNotProhibited;
    }

    allowDerivatives(license1: License, license2: License): boolean {
        let l1AllowsDerivatives = this.permitsDerivatives(license1.permissions) && 
                                !this.prohibitsDerivatives(license1.prohibitions);
                                
        let l2AllowsDerivatives = this.permitsDerivatives(license2.permissions) && 
                                !this.prohibitsDerivatives(license2.prohibitions);

        return l1AllowsDerivatives && l2AllowsDerivatives;
    }

    private prohibitsDerivatives(prohibitions: Action[]): boolean {
        return prohibitions.findIndex((prohibition) => prohibition.id == 1) >= 0;
    }

    private permitsDerivatives(permissions: Action[]): boolean {
        return permissions.findIndex((permission) => permission.id == 1) >= 0;
    }

    conformToShareAlike(license1: License, license2: License): boolean {
        let l1requiresShareAlike = this.requiresShareAlikeCheck(license1.duties);
        let l2requiresShareAlike = this.requiresShareAlikeCheck(license2.duties);

        if (!l1requiresShareAlike && !l2requiresShareAlike) {
            return true;
        }

        let l1Conforms = true;
        let l2Conforms = true;
        if (l1requiresShareAlike) {
            l1Conforms = this.containsShareAlike(license1.shareAlikes, license2.metaInformation.id);
        }

        if (l2requiresShareAlike) {
            l2Conforms = this.containsShareAlike(license2.shareAlikes, license1.metaInformation.id);
        }
        
        return l1Conforms && l2Conforms;
    }

    private requiresShareAlikeCheck(duties: Action[]): boolean {
        return duties.findIndex((duty) => duty.id === 5) >= 0;
    }

    private containsShareAlike(shareAlikes: number[], id: number): boolean {
        return shareAlikes.findIndex((shareAlike: number) => shareAlike == id) >= 0;
    }

    conformToRelicense(license1: License, license2: License): boolean {
        let isTheSameLicense = (license1.metaInformation.id === license2.metaInformation.id);
    
        if (isTheSameLicense)
            return true;

        let license1AllowsRelicensing = this.containsRelicensing(license1.permissions) && !this.containsRelicensing(license1.prohibitions);
        let license2AllowsRelicensing = this.containsRelicensing(license2.permissions) && !this.containsRelicensing(license2.prohibitions);

        return license1AllowsRelicensing && license2AllowsRelicensing;
    }
    
    private containsRelicensing(actions: Action[]): boolean {
        return actions.findIndex((action: Action) => action.id === 27) >= 0;
    }

    runChecks(license: AggregatedLicenseV2 ) {
        let dutyCheck = this.canfulfillDuties(license.prohibitions, license.duties);
        let derivateCheck = this.allowDerivatives(license.license1, license.license2);
        let shareAlikeCheck = this.conformToShareAlike(license.license1, license.license2);
        let relicenseCheck = this.conformToRelicense(license.license1, license.license2);

        return dutyCheck && derivateCheck && shareAlikeCheck && relicenseCheck;
    }

    checkCombinedLicense(license: CombinedLicense ): CheckResult {
        let result = true;
        let checkResults = [];
        for (let i = 0; i <= license.numberOfLicenses - 1; i++) {
            let licenseInfo1 = license.licenses[i];
            let license1 = this.licenseFinder.getLicense(licenseInfo1.name);

            if (license1 === undefined)
                continue;

            for (let j = 0; j < license.numberOfLicenses - 1; j++) {
                let licenseInfo2 = license.licenses[j];
                let license2 = this.licenseFinder.getLicense(licenseInfo2.name);
                
                if (license2 === undefined)
                    continue;

                if (i === j) {
                    continue;
                }

                let checkResult = this.checkLicenses(license1, license2); 
                if (checkResult.result == false) {
                    result = false;
                }
                checkResults.push(checkResult);
            }
        }

        return { result, checks: checkResults };
    }

    private checkLicenses(license1: License, license2: License): SingleCheckResult {
        let dutiesCheck = this.canfulfillDuties(license1.prohibitions, license2.duties) 
                        && this.canfulfillDuties(license2.prohibitions, license1.duties);

        let derivativesCheck = this.allowDerivatives(license1, license2);
        let shareAlikeCheck = this.conformToShareAlike(license1, license2);
        let relicensingCheck = this.conformToRelicense(license1, license2);

        let result = dutiesCheck && derivativesCheck && shareAlikeCheck && relicensingCheck;

        return { 
            name1: license1.metaInformation.spdxName,
            name2: license2.metaInformation.spdxName,
            result,
            dutiesCheck, 
            derivativesCheck,
            shareAlikeCheck,
            relicensingCheck
        };
    }

    runCompatibilityChecks() : SingleCheckResult[] {
        let licenses = this.licenseFinder.getLicenses();

        let results: SingleCheckResult[] = [];
        for(let i = 0; i < licenses.length; i++) {
            let license1 = licenses[i];

            if (license1 == null) {
                throw new Error("License1 is missing");
            }

            for(let j = 0; j < licenses.length; j++) {
                let license2 = licenses[j];
                if (license2 == null) {
                    throw new Error("License1 is missing");
                }

                let result = this.checkLicenses(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }
}

export default Checks;