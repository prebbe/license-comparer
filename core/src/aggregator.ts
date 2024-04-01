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

import { join, union } from './helpers';
import License from './entities/License';
import Action from './entities/Action';
import CompositeLicense from './entities/CompositeLicense';
import MetaInformation from './entities/MetaInformation';
import LicenseFinder from './licenseFinder';

class Aggregator {
    licenseFinder: LicenseFinder;

    constructor() {
        this.licenseFinder = new LicenseFinder();
    }

    private combinePermissions(permissions1: Action[], permissions2: Action[]): Action[] {
        let result = join(permissions1, permissions2);

        return result;
    }
    
    private combineProhibitions(prohibitions1: Action[], prohibitions2: Action[]): Action[] {
        let result = union(prohibitions1, prohibitions2);
    
        return result;
    }
    
    private combineDuties(duties1: Action[], duties2: Action[]): Action[] {
        let result = union(duties1, duties2);
    
        return result;
    }
    
    createCompositeLicense(license1: License, license2: License) : CompositeLicense {
        let permissions = this.combinePermissions(license1.permissions, license2.permissions);
        let prohibitions = this.combineProhibitions(license1.prohibitions, license2.prohibitions);
        let duties = this.combineDuties(license1.duties, license2.duties);
         
        let metainformations: MetaInformation[] = [license1.metaInformation, license2.metaInformation];

        return { 
            metainformations,
            numberOfLicenses: 2,
            permissions, 
            prohibitions, 
            duties 
        };
    }

    extendCompositeLicense(composite: CompositeLicense, license: License) : CompositeLicense {
        let permissions = this.combinePermissions(composite.permissions, license.permissions);
        let prohibitions = this.combineProhibitions(composite.prohibitions, license.prohibitions);
        let duties = this.combineDuties(composite.duties, license.duties);
    
        let metainformations: MetaInformation[] = composite.metainformations;
        metainformations.push(license.metaInformation);

        let numberOfLicenses = composite.numberOfLicenses + 1;

        return { 
            metainformations,
            numberOfLicenses,
            permissions, 
            prohibitions, 
            duties 
        };
    }

    runFullAggregation(): CompositeLicense[] {
        let licenses = this.licenseFinder.getLicenses();

        let results: CompositeLicense[] = [];
        for(let i = 0; i < licenses.length; i++) {
            let license1 = licenses[i];

            if (license1 == null) {
                throw new Error("License1 is missing");
            }

            for(let j = 0; j < licenses.length; j++) {
                let license2 = licenses[j];
                if (license2 == null) {
                    throw new Error("License1 is missing");
                }

                let result = this.createCompositeLicense(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }
}

export default Aggregator;