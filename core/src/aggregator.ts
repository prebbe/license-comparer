import DataAccess from './dataAccess';
import { join, union } from './helpers';
import Checks from './checks';
import License from './entities/License';
import Action from './entities/Action';
import AggregatedLicense from './entities/AggregatedLicense';
import AggregatedLicenseV2 from './entities/AggregatedLicenseV2';
import LicenseCompatibilityCheckResult from './entities/LicenseCompatibilityCheckResult';

class Aggregator {
    db: DataAccess;
    checks: Checks;

    constructor() {
        this.db = new DataAccess();
        this.checks = new Checks();
    }

    private combinePermissions(license1: License, license2: License): Action[] {
        let result = join(license1.permissions, license2.permissions);

        return result;
    }
    
    private combineProhibitions(license1: License, license2: License): Action[] {
        let result = union(license1.prohibitions, license2.prohibitions);
    
        return result;
    }
    
    private combineDuties(license1: License, license2: License): Action[] {
        let result = union(license1.duties, license2.duties);
    
        return result;
    }
    
    private cleanPermissions(permissions: Action[], prohibitions: Action[]): Action[] {
        let result = permissions.map((p) => p);
        for (let i = 0; i < prohibitions.length; i++) {
            let prohibition = prohibitions[i];
    
            let permission = permissions.find((p:Action) => p.id == prohibition.id)
            if (permission === undefined) {
                continue;
            }

            let index = permissions.indexOf(permission);
            if (index < 0) {
                continue;
            }
                
            result.splice(index, 1);
        }
    
        return result;
    }
    
    aggregateLicense(license1: License, license2: License) : AggregatedLicense {
        let prohibitions = this.combineProhibitions(license1, license2);
        let duties = this.combineDuties(license1, license2);
    
        let combinedPermissions = this.combinePermissions(license1, license2);
        let permissions = this.cleanPermissions(combinedPermissions, prohibitions);
    
        return { 
            license1: license1.metaInformation, 
            license2: license2.metaInformation, 
            permissions, 
            prohibitions, 
            duties 
        };
    }

    combineLicenses(license1: License, license2: License) : AggregatedLicenseV2 {
        let permissions = this.combinePermissions(license1, license2);
        let prohibitions = this.combineProhibitions(license1, license2);
        let duties = this.combineDuties(license1, license2);
        
        return {license1, license2, permissions, prohibitions, duties}
        
    }

    runLicenseChecks(license1: License, license2: License) : LicenseCompatibilityCheckResult {
        let combinedLicenses = this.combineLicenses(license1, license2);

        let checkResult = Checks.runChecks(combinedLicenses);

        return {
            checkType: 'v2',
            license1,
            license2,
            verdict: checkResult,
            permissionCheck: checkResult,
            prohibitionCheck: checkResult, 
            dutiesCheck: checkResult,
            shareAlikeCheck: checkResult,
            relicenseCheck: checkResult 
        };
    }

    runFullAggregation(): AggregatedLicense[] {
        let licenses = this.db.loadLicenses();

        let results: AggregatedLicense[] = [];
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

                let result = this.aggregateLicense(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }

    runCompatibilityChecks() : LicenseCompatibilityCheckResult[] {
        let licenses = this.db.loadLicenses();

        let results: LicenseCompatibilityCheckResult[] = [];
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

                let result = this.runLicenseChecks(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }
}

export default Aggregator;