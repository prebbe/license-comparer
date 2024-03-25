import Action from "./entities/Action";
import CompatibilityCheckResult from "./entities/CompatibilityCheckResult";
import License from "./entities/License";
import { isSubsetOf, join, areDistinct } from "./helpers";
import LicenseFinder from "./licenseFinder";

class Checker {
    licenseFinder: LicenseFinder;

    constructor() {
        this.licenseFinder = new LicenseFinder();
    }

    private permissionsAreLessRestrictive(license1: License, license2: License) : boolean {
        let permissionsAreSubset = isSubsetOf(license2.permissions, license1.permissions);

        let permissionsAreNotRestricted = areDistinct(license2.permissions, license1.prohibitions);

        return permissionsAreSubset && permissionsAreNotRestricted;
    }

    private prohibitionsAreLessRestrictive(license1: License, license2: License) : boolean {
        let prohibitionsAreSubset = isSubsetOf(license1.prohibitions, license2.prohibitions);

        let prohibitionsAreNotRestricted = areDistinct(license1.prohibitions, license2.permissions);

        return prohibitionsAreSubset && prohibitionsAreNotRestricted;
    }

    private dutiesAreLessRestrictive(license1: License, license2: License) : boolean {
        let dutiesAreSubset = isSubsetOf(license1.duties, license2.duties);

        return dutiesAreSubset;
    }

    private allowsRelicensing(license1: License, license2: License): boolean {
        if (license1.metaInformation.id === license2.metaInformation.id) {
            return true;
        }

        let license1AllowsRelicensing = license1.permissions.findIndex((action: Action) => action.id === 27) >= 0;

        return license1AllowsRelicensing;
    }

    private conformsToShareAlike(license1: License, license2: License): boolean {
        if (license1.metaInformation.id === license2.metaInformation.id) {
            return true;
        }

        let hasShareAlikeDuty = license1.duties.findIndex((action: Action) => action.id === 5) >= 0;
        if (hasShareAlikeDuty === false) {
            return true;
        }

        let license2IsIncluded = license1.shareAlikes.findIndex((id: number) => id === license2.metaInformation.id) >= 0;

        return license2IsIncluded;
    }

    isLessRestrictive(license1: License, license2: License) : boolean {
        // Check if it is the same license
        // Then this statement also holds true
        if (license1.metaInformation.id === license2.metaInformation.id) {
            return true;
        }

        // Check the permissions
        let permissionsAreLessRestrictive = this.permissionsAreLessRestrictive(license1, license2);

        // Check the prohibitions
        let prohibitionsAreLessRestrictive = this.prohibitionsAreLessRestrictive(license1, license2);

        // Check the duties
        let dutiesAreLessRestrictive = this.dutiesAreLessRestrictive(license1, license2);

        return permissionsAreLessRestrictive && 
            prohibitionsAreLessRestrictive &&
            dutiesAreLessRestrictive;
    }

    private haveCommonPermissions(license1: License, license2: License): boolean {
        let permissionsAreDistinct = areDistinct(license1.permissions, license2.permissions);

        return permissionsAreDistinct === false;
    }

    private dutiesAreNotProhibited(license1: License, license2: License): boolean {
        let dutiesAreNotProhibited = join(license1.duties, license2.prohibitions).length == 0;

        return dutiesAreNotProhibited;
    }

    private bothAllowRelicense(license1: License, license2: License): boolean {
        let license1AllowsRelicensing = this.allowsRelicensing(license1, license2);
        let license2AllowsRelicensing = this.allowsRelicensing(license2, license1);

        return license1AllowsRelicensing && license2AllowsRelicensing;
    }

    private canBeComposed(license1: License, license2: License): boolean {
        let haveCommonPermissions = this.haveCommonPermissions(license1, license2);
        let dutiesAreNotProhibited = this.dutiesAreNotProhibited(license1, license2);
        let bothAllowRelicense = this.bothAllowRelicense(license1, license2);

        return haveCommonPermissions && dutiesAreNotProhibited && bothAllowRelicense;
    }

    private allowCombination(license1: License, license2: License): boolean {
        let license1AllowsDerivatives = license1.permissions.findIndex((action: Action) => action.id === 1) >= 0;
        let license2AllowsDerivatives = license2.permissions.findIndex((action: Action) => action.id === 1) >= 0;

        return license1AllowsDerivatives && license2AllowsDerivatives;
    }

    areCompatible(license1: License, license2: License): CompatibilityCheckResult {
        let license1IsLessRestrictive = this.isLessRestrictive(license1, license2);
        let license1AllowsRelicensing = this.allowsRelicensing(license1, license2);
        let license1ConformsToShareAlike = this.conformsToShareAlike(license1, license2);
        
        let lessRestrictive = license1IsLessRestrictive && license1AllowsRelicensing && license1ConformsToShareAlike;

        let canBeComposed = this.canBeComposed(license1, license2);

        let allowCombination = this.allowCombination(license1, license2);

        let areCompatible = ((license1IsLessRestrictive) ||
                            canBeComposed) && allowCombination;

        return {
            name1: license1.metaInformation.name,
            name2: license2.metaInformation.name,
            lessRestrictive: lessRestrictive,
            canBeComposed: canBeComposed,
            allowCombination: allowCombination,
            areCompatible: areCompatible
        };
    }

    runCompatibilityChecks() : CompatibilityCheckResult[] {
        let licenses = this.licenseFinder.getLicenses();

        let results: CompatibilityCheckResult[] = [];
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

                let result = this.areCompatible(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }
}

export default Checker;