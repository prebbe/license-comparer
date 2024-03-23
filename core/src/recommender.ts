import License from './entities/License';
import Action from './entities/Action';
import { CombinedComparisonResult, ComparisonResult, RecommendationResult } from './entities/RecommendationResult';
import LicenseFinder from './licenseFinder';
import CompositeLicense from './entities/CompositeLicense';

class Recommender {
    licenseFinder: LicenseFinder;

    constructor() {
        this.licenseFinder = new LicenseFinder();
    }

    findSimilarLicenses(compositeLicense: CompositeLicense) : RecommendationResult[] {
        let licenses = this.licenseFinder.getLicenses();

        let results : RecommendationResult[] = [];
        for(let i = 0; i < licenses.length; i++) {
            let license = licenses[i];

            let comparisonResult = this.compareStandardWithSyntheticLicense(license, compositeLicense);

            if (comparisonResult.isEqual || comparisonResult.isMoreRestrictive) {
                let shareAlikeCheck = this.runShareAlikeCheck(compositeLicense, license);
                
                if(shareAlikeCheck) {
                    let result = { comparisonResult, name: license.metaInformation.name };
                    results.push(result);    
                }
            }
        }

        return results;
    }

    private compareStandardWithSyntheticLicense(standard: License, synthetic: CompositeLicense) : CombinedComparisonResult {
        let permissionCheck = this.compareActions(standard.permissions, synthetic.permissions);
        let prohibitionCheck = this.compareActions(standard.prohibitions, synthetic.prohibitions);
        let dutyCheck = this.compareActions(standard.duties, synthetic.duties);

        let isEqual = this.isEqual(permissionCheck, prohibitionCheck, dutyCheck);
        let isMoreRestrictive = this.moreRestrictive(permissionCheck, prohibitionCheck, dutyCheck);

        return { permissionCheck, prohibitionCheck, dutyCheck, isEqual, isMoreRestrictive }
    }

    private compareActions(actions1: Action[], actions2: Action[]): ComparisonResult {
        let missingActions: Action[] = Object.assign([], actions2) ;
        let additionalActions: Action[] = [];
        for (let i = 0; i < actions1.length; i++) {
            let index = missingActions.findIndex(a => a.id == actions1[i].id);

            if (index < 0) {
                additionalActions.push(actions1[i]);
            } else {
                missingActions.splice(index, 1);
            }
        }

        return { missingActions, additionalActions };
    }

    private isEqual(permissionCheck: ComparisonResult, prohibitionCheck: ComparisonResult, dutyCheck: ComparisonResult): boolean {
        let permissionsAreEqual = permissionCheck.additionalActions.length == 0 && permissionCheck.missingActions.length == 0;
        let prohibitionsAreEqual = prohibitionCheck.additionalActions.length == 0 && prohibitionCheck.missingActions.length == 0;
        let dutiesAreEqual = dutyCheck.additionalActions.length == 0 && dutyCheck.missingActions.length == 0;

        let isEqual = permissionsAreEqual && prohibitionsAreEqual && dutiesAreEqual;
        
        return isEqual;
    }

    private moreRestrictive(permissionCheck: ComparisonResult, prohibitionCheck: ComparisonResult, dutyCheck: ComparisonResult): boolean {
        let permissionsAreMoreRestrictive = permissionCheck.additionalActions.length == 0 && permissionCheck.missingActions.length >= 0;
        let prohibitionsAreMoreRestrictive = prohibitionCheck.additionalActions.length >= 0 && prohibitionCheck.missingActions.length == 0;
        let dutiesAreMoreRestrictive = dutyCheck.additionalActions.length >= 0 && dutyCheck.missingActions.length == 0;

        let areMoreRestrictive = permissionsAreMoreRestrictive && prohibitionsAreMoreRestrictive && dutiesAreMoreRestrictive;
        
        return areMoreRestrictive;
    }
    
    private requiresShareAlikeCheck(duties: Action[]): boolean {
        return duties.findIndex((duty) => duty.id === 5) >= 0;
    }

    private containsShareAlike(shareAlikes: number[], id: number): boolean {
        return shareAlikes.findIndex((shareAlike: number) => shareAlike == id) >= 0;
    }

    private areShareAlikeConform(license1: License, license2: License) {
        let l1requiresShareAlike = this.requiresShareAlikeCheck(license1.duties);

        if (!l1requiresShareAlike) {
            return true;
        }

        return this.containsShareAlike(license1.shareAlikes, license2.metaInformation.id);
    }

    private runShareAlikeCheck(compositeLicense: CompositeLicense, license: License) : boolean {
        let result = true;
        for(let i = 0; i < compositeLicense.numberOfLicenses; i++) {
            let includedLicense = this.licenseFinder.getLicense(compositeLicense.metainformations[i].name);

            if (includedLicense == undefined) {
                continue;
            }

            let singleResult = this.areShareAlikeConform(includedLicense, license);
            if (singleResult === false) {
                result = false;
                break;
            }
        }

        return result;
    }

}

export default Recommender;