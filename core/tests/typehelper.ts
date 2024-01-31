import Action from "../src/entities/Action";
import License from "../src/entities/License";
import MetaInformation from "../src/entities/MetaInformation";
import ShareAlike from "../src/entities/ShareAlike";

function createMetaInformation(id: number, name: string, shortName: string, sourceLink: string, description: string) : MetaInformation {
    return {
        id,
        name,
        shortName,
        sourceLink,
        description
    };
}

function createAction(id: number, name: string) : Action {
    return {
        id,
        name
    };
}

function createShareAlike(
    id: number,
    licenseId1: number,
    licenseName1: string,
    licenseShortName1: string,
    licenseId2: number,
    licenseName2: string,
    licenseShortName2: string
): ShareAlike {
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

function createLicense(
    metaInformation: MetaInformation,
    permissions: Action[],
    prohibitions: Action[],
    duties: Action[],
    shareAlikes: ShareAlike[]
    ): License {

    return {
        metaInformation,
        permissions,
        prohibitions,
        duties,
        shareAlikes
    };
}

export {
    createLicense,
    createMetaInformation,
    createAction,
    createShareAlike
}
