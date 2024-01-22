const db = require('./dataAccess');

// Share Alike Check
async function conformToShareAlike(license1: string, license2: string) {
    let shareAlikesLicense1 = await db.loadShareAlikesByName(license1);

    if (shareAlikesLicense1.length == 0)
        return true;

    return shareAlikesLicense1.filter((shareAlike: any) => shareAlike.licenseName2 == license2).length >= 1;
}

// Relicense Check
async function conformToRelicense(license1: string, license2: string) {
    let isTheSameLicense = (license1 === license2);
    
    if (isTheSameLicense)
        return true;

    let license1Permissions = await db.loadPermissionsByName(license1);
    let license1AllowsRelicensing = license1Permissions.filter((permission: any) => permission.id === 27).length === 0;
    
    if (!license1AllowsRelicensing) {
        return false;
    }

    let license2Permissions = await db.loadPermissionsByName(license1);
    let license2AllowsRelicensing = license2Permissions.filter((permission: any) => permission.id === 27).length === 0;

    return license2AllowsRelicensing;
}

// Full Compatibility
async function permissionsAreFullyCompatible(license1: string, license2: string) {
    let license1Permissions = await db.loadPermissionsByName(license1);
    let license2Permissions = await db.loadPermissionsByName(license2);

    let subSetCheck1 = db.isSubsetOfLicenseActions(license1Permissions, license2Permissions);
    let subSetCheck2 = db.isSubsetOfLicenseActions(license2Permissions, license1Permissions);

    return subSetCheck1.isFullyIncluded && subSetCheck2.isFullyIncluded;
}

async function prohibitionsAllowAllPermissions(license1: string, license2: string) {
    let license1Permissions = await db.loadPermissionsByName(license1);
    let license2Permissions = await db.loadPermissionsByName(license2);

    let license1Prohibitions = await db.loadProhibitionsByName(license1);
    let license2Prohibitions = await db.loadProhibitionsByName(license2);

    let subSetCheck1 = db.isSubsetOfLicenseActions(license1Permissions, license2Prohibitions);
    let subSetCheck2 = db.isSubsetOfLicenseActions(license2Permissions, license1Prohibitions);

    return !subSetCheck1.isPartiallyIncluded && !subSetCheck2.isPartiallyIncluded;
}

async function prohibitionsAllowAllDuties(license1: string, license2: string) {
    let license1Duties = await db.loadDutiesByName(license1);
    let license2Duties = await db.loadDutiesByName(license2);

    let license1Prohibitions = await db.loadProhibitionsByName(license1);
    let license2Prohibitions = await db.loadProhibitionsByName(license2);

    let subSetCheck1 = db.isSubsetOfLicenseActions(license1Duties, license2Prohibitions);
    let subSetCheck2 = db.isSubsetOfLicenseActions(license2Duties, license1Prohibitions);

    return !subSetCheck1.isPartiallyIncluded && !subSetCheck2.isPartiallyIncluded;
}

export async function checkFullCompatibility(license1: string, license2: string) {
    let permissionCheck = await permissionsAreFullyCompatible(license1, license2);
    let prohibitionCheck = await prohibitionsAllowAllPermissions(license1, license2);
    let dutiesCheck = await prohibitionsAllowAllDuties(license1, license2);
    let shareAlikeCheck = await conformToShareAlike(license1, license2);
    let relicenseCheck = await conformToRelicense(license1, license2);

    let verdict = permissionCheck && prohibitionCheck && dutiesCheck && shareAlikeCheck && relicenseCheck;

    return { license1, license2, verdict, permissionCheck, prohibitionCheck, dutiesCheck, shareAlikeCheck, relicenseCheck };
}

// Partial Compatibility
async function permissionsArePartiallyCompatible(license1: string, license2: string) {
    let license1Permissions = await db.loadPermissionsByName(license1);
    let license2Permissions = await db.loadPermissionsByName(license2);

    let subSetCheck1 = db.isSubsetOfLicenseActions(license1Permissions, license2Permissions);
    let subSetCheck2 = db.isSubsetOfLicenseActions(license2Permissions, license1Permissions);

    return subSetCheck1.isPartiallyIncluded || subSetCheck2.isPartiallyIncluded;
}

async function prohibitionsAllowSomePermissions(license1: string, license2: string) {
    let license1Permissions = await db.loadPermissionsByName(license1);
    let license2Permissions = await db.loadPermissionsByName(license1);

    let license1Prohibitions = await db.loadProhibitionsByName(license1);
    let license2Prohibitions = await db.loadProhibitionsByName(license2);

    let subSetCheck1 = db.isSubsetOfLicenseActions(license1Permissions, license2Prohibitions);
    let subSetCheck2 = db.isSubsetOfLicenseActions(license2Permissions, license1Prohibitions);

    return !subSetCheck1.isFullyIncluded || !subSetCheck2.isFullyIncluded;
}

async function prohibitionsAllowSomeDuties(license1: string, license2: string) {
    let license1Duties = await db.loadDutiesByName(license1);
    let license2Duties = await db.loadDutiesByName(license2);
    
    let license1Prohibitions = await db.loadProhibitionsByName(license1);
    let license2Prohibitions = await db.loadProhibitionsByName(license2);

    let subSetCheck1 = db.isSubsetOfLicenseActions(license1Duties, license2Prohibitions);
    let subSetCheck2 = db.isSubsetOfLicenseActions(license2Duties, license1Prohibitions);

    return !subSetCheck1.isFullyIncluded || !subSetCheck2.isFullyIncluded;
}

export async function checkPartialCompatibility(license1: string, license2: string) {
    let permissionCheck = await permissionsArePartiallyCompatible(license1, license2);
    let prohibitionCheck = await prohibitionsAllowSomePermissions(license1, license2);
    let dutiesCheck = await prohibitionsAllowSomeDuties(license1, license2);
    let shareAlikeCheck = await conformToShareAlike(license1, license2);
    let relicenseCheck = await conformToRelicense(license1, license2);

    let verdict = permissionCheck && prohibitionCheck && dutiesCheck && shareAlikeCheck && relicenseCheck;

    return { license1, license2, verdict, permissionCheck, prohibitionCheck, dutiesCheck, shareAlikeCheck, relicenseCheck };
}