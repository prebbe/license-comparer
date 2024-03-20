import { join, union } from './helpers';
import License from './entities/License';
import Action from './entities/Action';
import CompositeLicense from './entities/CompositeLicense';
import MetaInformation from './entities/MetaInformation';
import LicenseFinder from './licenseFinder';

class Aggregator {
    licenseFinder: LicenseFinder;

    constructor() {
        this.licenseFinder = new LicenseFinder();
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

    private removeDuplicates(actionsToCheck: Action[], actionsToRemove: Action[]): Action[] {
        let result = actionsToCheck.map((p) => p);
        for (let i = 0; i < actionsToRemove.length; i++) {
            let actionToRemove = actionsToRemove[i];
    
            let index = actionsToCheck.findIndex((a:Action) => a.id == actionToRemove.id);
            if (index < 0) {
                continue;
            }
                
            result.splice(index, 1);
        }
    
        return result;
    }
    
    createCompositeLicense(license1: License, license2: License) : CompositeLicense {
        let prohibitions = this.combineProhibitions(license1, license2);
        let duties = this.combineDuties(license1, license2);
    
        let combinedPermissions = this.combinePermissions(license1, license2);
        let permissionsWithoutProhibitions = this.removeDuplicates(combinedPermissions, prohibitions);
        let permissions = this.removeDuplicates(permissionsWithoutProhibitions, duties);
         
        let licenses: MetaInformation[] = [license1.metaInformation, license2.metaInformation];

        return { 
            licenses,
            permissions, 
            prohibitions, 
            duties 
        };
    }

    runFullAggregation(): CompositeLicense[] {
        let licenses = this.licenseFinder.getLicenses();

        let results: CompositeLicense[] = [];
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

                let result = this.createCompositeLicense(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }
}

export default Aggregator;