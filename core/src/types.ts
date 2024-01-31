type License = {
    id: number,
    name: string,
    shortName: string,
    sourceLink: string,
    description: string
};

function createLicense(id: number, name: string, shortName: string, sourceLink: string, description: string) : License {
    return {
        id,
        name,
        shortName,
        sourceLink,
        description
    };
}

type Action = {
    id: number,
    origin: string,
    name: string,
    description: string
};

function createAction(id: number, origin: string, name: string, description: string) : Action {
    return {
        id,
        origin,
        name,
        description
    };
}

type LicenseAction = {
    id: number,
    name: string
}

function createLicenseAction(id: number, name: string) : LicenseAction {
    return {
        id,
        name
    };
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

function createShareAlikes(
    id: number,
    licenseId1: number,
    licenseName1: string,
    licenseShortName1: string,
    licenseId2: number,
    licenseName2: string,
    licenseShortName2: string
): ShareAlikes {
    return {
        id,
        licenseId1,
        licenseName1,
        licenseShortName1,
        licenseId2,
        licenseName2,
        licenseShortName2
    };
}

type LicenseSummary = {
    metaInformation : License,
    permissions : LicenseAction[],
    prohibitions : LicenseAction[],
    duties : LicenseAction[],
    shareAlikes : ShareAlikes[]
}

function createLicenseSummary(
    metaInformation: License,
    permissions: LicenseAction[],
    prohibitions: LicenseAction[],
    duties: LicenseAction[],
    shareAlikes: ShareAlikes[]
    ): LicenseSummary {

    return {
        metaInformation,
        permissions,
        prohibitions,
        duties,
        shareAlikes
    };
}

type PartialLicenseMatchResult = {
    match : boolean,
    missingElements1: LicenseAction[], 
    missingElements2: LicenseAction[], 
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

type PartialLicenseCompatibilityCheckResult = {
    checkType: string,
    license1: LicenseSummary,
    license2: LicenseSummary,
    missingActions1: LicenseAction[],
    missingActions2: LicenseAction[],
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

type AggregatedLicenseV2 = {
    license1: LicenseSummary,
    license2: LicenseSummary,
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
    PartialLicenseMatchResult,
    LicenseCompatibilityCheckResult,
    AggregatedLicense,
    AggregatedLicenseV2
}

export {
    createLicense,
    createAction,
    createLicenseAction,
    createShareAlikes,
    createLicenseSummary
}
