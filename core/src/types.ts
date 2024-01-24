type License = {
    id: number,
    name: string,
    shortName: string,
    sourceLink: string,
    description: string
};

type Action = {
    id: number,
    origin: string,
    name: string,
    description: string
};

type LicenseAction = {
    id: number,
    name: string
}

type ShareAlikes = {
    id: number,
    licenseId1: number,
    licenseName1: string,
    licenseShortName1: string,
    licenseId2: number,
    licenseName2: string,
    licenseShortName2: string,
}

type LicenseSummary = {
    metaInformation : License,
    permissions : LicenseAction[],
    prohibitions : LicenseAction[],
    duties : LicenseAction[],
    shareAlikes : ShareAlikes[]
}

type LicenseCompatibilityCheckResult = {
    checkType: string,
    license1: LicenseSummary,
    license2: LicenseSummary,
    verdict: boolean,
    permissionCheck: boolean,
    prohibitionCheck: boolean, 
    dutiesCheck: boolean,
    shareAlikeCheck: boolean,
    relicenseCheck: boolean 
}

type AggregatedLicense = {
    license1: License,
    license2: License,
    permissions: LicenseAction[],
    prohibitions: LicenseAction[],
    duties: LicenseAction[]
}

export type {
    License, 
    Action, 
    LicenseAction, 
    ShareAlikes, 
    LicenseSummary,
    LicenseCompatibilityCheckResult,
    AggregatedLicense
}
