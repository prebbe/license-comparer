import DataAccess from './dataAccess';
import License from './entities/License';
import LicenseCompatibilityCheckResult from './entities/LicenseCompatibilityCheckResult';
import { Rules } from './rules';

class CompatibilityChecker {
    db: DataAccess;

    constructor() {
        this.db = new DataAccess();
    }
    
    checkFullCompatibility(license1: License, license2: License): LicenseCompatibilityCheckResult {
        const checkType = 'Full';
        
        let permissionCheck = Rules.permissionsAreCompatible(license1, license2);
        let prohibitionCheck = Rules.prohibitionsAndPermissionsAreCompatible(license1, license2);
        let dutiesCheck = Rules.prohibitionsAndDutiesAreCompatible(license1, license2);

        let shareAlikeCheck = Rules.conformToShareAlike(license1, license2);
        let relicenseCheck = Rules.conformToRelicense(license1, license2);
    
        let verdict = permissionCheck && prohibitionCheck && dutiesCheck && shareAlikeCheck && relicenseCheck;
    
        return { checkType, license1, license2, verdict, permissionCheck, prohibitionCheck, dutiesCheck, shareAlikeCheck, relicenseCheck };
    }
    
    checkPartialCompatibility(license1: License, license2: License): LicenseCompatibilityCheckResult {
        const checkType = 'Partial';

        let permissionCheck = Rules.permissionsArePartiallyCompatible(license1, license2);
        let prohibitionCheck = Rules.prohibitionsAndPermissionsArePartiallyCompatible(license1, license2);
        let dutiesCheck = Rules.prohibitionsAndDutiesAreCompatible(license1, license2);

        let shareAlikeCheck = Rules.conformToShareAlike(license1, license2);
        let relicenseCheck = Rules.conformToRelicense(license1, license2);
    
        let verdict = permissionCheck && prohibitionCheck && dutiesCheck && shareAlikeCheck && relicenseCheck;
    
        return { checkType, license1, license2, verdict, permissionCheck, prohibitionCheck, dutiesCheck, shareAlikeCheck, relicenseCheck };
    }

    runFullCompatibilityCheck(): LicenseCompatibilityCheckResult[] {
        let licenses = this.db.loadLicenses();
        let result: LicenseCompatibilityCheckResult[] = [];
        
        for (const license1 of licenses) {
            for (const license2 of licenses) {
                let checkResult = this.checkFullCompatibility(license1, license2);
    
                result.push(checkResult);
            }
        }
        
        return result;
    }
    
    runPartialCompatibilityCheck() : LicenseCompatibilityCheckResult[] {
        let licenses = this.db.loadLicenses();
        let result: LicenseCompatibilityCheckResult[] = [];

        for (const license1 of licenses) {
            for (const license2 of licenses) {
                let checkResult = this.checkPartialCompatibility(license1, license2);
    
                result.push(checkResult);
            }
        }
    
        return result;
    }
}

export default CompatibilityChecker;