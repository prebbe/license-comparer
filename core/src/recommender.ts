import DataAccess from './dataAccess';
import { join, union } from './helpers';
import License from './entities/License';
import Action from './entities/Action';
import AggregatedLicense from './entities/AggregatedLicense';
import AggregatedLicenseV2 from './entities/AggregatedLicenseV2';
import LicenseCompatibilityCheckResult from './entities/LicenseCompatibilityCheckResult';
import CombinedLicense from './entities/CombinedLicense';

class Recommender {
    db: DataAccess;

    constructor() {
        this.db = new DataAccess();
    }

    findSimilarLicenses(combinedLicense: CombinedLicense) : RecommendationResult[] {
        let licenses = this.db.loadLicenses();

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

type RecommendationResult = {
    comparisonResult: CombinedComparisonResult,
    name: string
}

type CombinedComparisonResult = {
    permissionCheck: ComparisonResult,
    prohibitionCheck: ComparisonResult,
    dutyCheck: ComparisonResult,

    isEqual: boolean,
    isMoreRestrictive: boolean
}

type ComparisonResult = {
    additionalActions: Action[],
    missingActions: Action[]
}

export type { RecommendationResult, CombinedComparisonResult, ComparisonResult };
export default Recommender;