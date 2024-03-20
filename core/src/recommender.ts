import License from './entities/License';
import Action from './entities/Action';
import CombinedLicense from './entities/CombinedLicense';
import { CombinedComparisonResult, ComparisonResult, RecommendationResult } from './entities/RecommendationResult';
import LicenseFinder from './licenseFinder';

class Recommender {
    licenseFinder: LicenseFinder;

    constructor() {
        this.licenseFinder = new LicenseFinder();
    }

    findSimilarLicenses(combinedLicense: CombinedLicense) : RecommendationResult[] {
        let licenses = this.licenseFinder.getLicenses();

        let results : RecommendationResult[] = [];
        for(let i = 0; i < licenses.length; i++) {
            let license = licenses[i];

            let comparisonResult = this.compareStandardWithSyntheticLicense(license, combinedLicense);

            if (comparisonResult.isEqual || comparisonResult.isMoreRestrictive) {
                let result = { comparisonResult, name: license.metaInformation.name };
                results.push(result);
            }
        }

        return results;
    }

    private compareStandardWithSyntheticLicense(standard: License, synthetic: CombinedLicense) : CombinedComparisonResult {
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
}

export default Recommender;