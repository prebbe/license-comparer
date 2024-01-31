import License from "./License"

type LicenseCompatibilityCheckResult = {
    checkType: string,
    license1: License,
    license2: License,
    verdict: boolean,
    permissionCheck: boolean,
    prohibitionCheck: boolean, 
    dutiesCheck: boolean,
    shareAlikeCheck: boolean,
    relicenseCheck: boolean 
}

export default LicenseCompatibilityCheckResult;