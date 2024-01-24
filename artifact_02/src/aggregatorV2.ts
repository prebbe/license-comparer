import * as db from './dataAccess';
import DataAccess from './dataAccessV2';
import { AggregatedLicense, License, LicenseAction } from './types';

class Aggregator {
    db: DataAccess;

    constructor() {
        this.db = new DataAccess();
    }

    private combinePermissions(license1: string, license2: string): LicenseAction[] {
        let permissions1 = this.db.loadLicensePermissions(license1);
        let permissions2 = this.db.loadLicensePermissions(license2);
    
        if (permissions1 == null || permissions1.length === 0) {
            return [];
        }
    
        if (permissions2 == null || permissions2.length === 0) {
            return [];
        }

        let result = [];
        for (let i = 0; i < permissions1.length; i++) {
            for (let j = 0; j < permissions2.length; j++) {
                if (permissions1[i].id != permissions2[j].id) {
                    continue;
                }
    
                result.push(permissions1[i]);
            }
        }
    
        return result;
    }
    
    private combineProhibitions(license1: string, license2: string): LicenseAction[] {
        let prohibitions1 = this.db.loadLicenseProhibitions(license1);
        let prohibitions2 = this.db.loadLicenseProhibitions(license2);
    
        if (prohibitions1 == null || prohibitions1.length === 0) {
            if (prohibitions2 == null || prohibitions2.length === 0) {
                return [];
            }
    
            return prohibitions2;
        }
    
        if (prohibitions2 == null || prohibitions2.length === 0) {
            return prohibitions1;
        }

        let result = prohibitions1;
        for (let i = 0; i < prohibitions2.length; i++) {
            let prohibitionToCheck = prohibitions2[i];

            if (prohibitionToCheck == null) {
                continue;
            }

            let match1 = result.find((p:any) => p.id == prohibitionToCheck.id);
            if (match1 != undefined)
                continue;
            
            result.push(prohibitions2[i]);
        }
    
        return result;
    }
    
    private combineDuties(license1: string, license2: string): LicenseAction[] {
        let duties1 = this.db.loadLicenseDuties(license1);
        let duties2 = this.db.loadLicenseDuties(license2);
    
        if (duties1 == undefined || duties1.length === 0) {
            if (duties2 == undefined || duties2.length === 0) {
                return [];
            }
            
            return duties2;
        }

        if (duties2 == null || duties2.length === 0) {
            return duties1;
        }
    
        let result = duties1;
        for (let i = 0; i < duties2.length; i++) {
            let dutyToCheck = duties2[i];

            if (dutyToCheck == null) {
                continue;
            }

            let match1 = result.find((p:any) => p.id == dutyToCheck.id);
            if (match1 != undefined)
                continue;
            
            result.push(duties2[i]);
        }
    
        return result;
    }
    
    private cleanPermissions(permissions: LicenseAction[], prohibitions: LicenseAction[]): LicenseAction[] {
        let result = permissions.map((p) => p);
        for (let i = 0; i < prohibitions.length; i++) {
            let prohibition = prohibitions[i];
    
            let permission = permissions.find((p:LicenseAction) => p.id == prohibition.id)
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
        let prohibitions = this.combineProhibitions(license1.name, license2.name);
        let duties = this.combineDuties(license1.name, license2.name);
    
        let combinedPermissions = this.combinePermissions(license1.name, license2.name);
        let permissions = this.cleanPermissions(combinedPermissions, prohibitions);
    
        return { license1, license2, permissions, prohibitions, duties };
    }
}

export default Aggregator;