import DataAccess from './dataAccess';
import { isSubsetOf } from './helpers';
import { Rules } from './rules';
import { LicenseSummary, LicenseCompatibilityCheckResult } from './types';

class CompatibilityChecker {
    db: DataAccess;

    constructor() {
        this.db = new DataAccess();
    }

    private permissionsAreFullyCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let subSetCheck1 = isSubsetOf(license1.permissions, license2.permissions);
        let subSetCheck2 =isSubsetOf(license2.permissions, license1.permissions);
    
        return subSetCheck1.isFullyIncluded && subSetCheck2.isFullyIncluded;
    }
    
    private prohibitionsAllowAllPermissions(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let subSetCheck1 = isSubsetOf(license1.permissions, license2.prohibitions);
        let subSetCheck2 = isSubsetOf(license2.permissions, license1.prohibitions);
    
        return !subSetCheck1.isPartiallyIncluded && !subSetCheck2.isPartiallyIncluded;
    }
    
    private prohibitionsAllowAllDuties(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let subSetCheck1 = isSubsetOf(license1.duties, license2.prohibitions);
        let subSetCheck2 = isSubsetOf(license2.duties, license1.prohibitions);
    
        return !subSetCheck1.isPartiallyIncluded && !subSetCheck2.isPartiallyIncluded;
    }
    
    checkFullCompatibility(license1: LicenseSummary, license2: LicenseSummary): LicenseCompatibilityCheckResult {
        const checkType = 'Full';
        
        let permissionCheck = this.permissionsAreFullyCompatible(license1, license2);
        let prohibitionCheck = this.prohibitionsAllowAllPermissions(license1, license2);
        let dutiesCheck = this.prohibitionsAllowAllDuties(license1, license2);

        let shareAlikeCheck = Rules.conformToShareAlike(license1, license2);
        let relicenseCheck = Rules.conformToRelicense(license1, license2);
    
        let verdict = permissionCheck && prohibitionCheck && dutiesCheck && shareAlikeCheck && relicenseCheck;
    
        return { checkType, license1, license2, verdict, permissionCheck, prohibitionCheck, dutiesCheck, shareAlikeCheck, relicenseCheck };
    }
    
    // Partial Compatibility
    private permissionsArePartiallyCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let subSetCheck1 = isSubsetOf(license1.permissions, license2.permissions);
        let subSetCheck2 = isSubsetOf(license2.permissions, license1.permissions);
    
        return subSetCheck1.isPartiallyIncluded || subSetCheck2.isPartiallyIncluded;
    }
    
    private prohibitionsAllowSomePermissions(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let subSetCheck1 = isSubsetOf(license1.permissions, license2.prohibitions);
        let subSetCheck2 = isSubsetOf(license2.permissions, license1.prohibitions);
    
        return !subSetCheck1.isFullyIncluded || !subSetCheck2.isFullyIncluded;
    }
    
    private prohibitionsAllowSomeDuties(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let subSetCheck1 = isSubsetOf(license1.duties, license2.prohibitions);
        let subSetCheck2 = isSubsetOf(license2.duties, license1.prohibitions);
    
        return !subSetCheck1.isFullyIncluded || !subSetCheck2.isFullyIncluded;
    }
    
    checkPartialCompatibility(license1: LicenseSummary, license2: LicenseSummary): LicenseCompatibilityCheckResult {
        const checkType = 'Partial';

        let permissionCheck = this.permissionsArePartiallyCompatible(license1, license2);
        let prohibitionCheck = this.prohibitionsAllowSomePermissions(license1, license2);
        let dutiesCheck = this.prohibitionsAllowSomeDuties(license1, license2);

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