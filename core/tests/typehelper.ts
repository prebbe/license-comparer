// Copyright 2024 Philip Rebbe

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
