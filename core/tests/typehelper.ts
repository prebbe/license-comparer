import Action from "../src/entities/Action";
import License from "../src/entities/License";
import MetaInformation from "../src/entities/MetaInformation";

function createMetaInformation(id: number, name: string, spdxName: string, sourceLink: string, description: string) : MetaInformation {
    return {
        id,
        name,
        spdxName,
        dcatName: '',
        sourceLink,
        description
    };
}

function createAction(id: number, name: string) : Action {
    return {
        id,
        name,
        displayName: '',
        description: ''
    };
}

function createLicense(
    metaInformation: MetaInformation,
    permissions: Action[],
    prohibitions: Action[],
    duties: Action[],
    shareAlikes: number[]
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
    createAction
}
