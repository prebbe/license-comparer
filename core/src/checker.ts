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

import Action from "./entities/Action";
import CompatibilityCheckResult from "./entities/CompatibilityCheckResult";
import License from "./entities/License";
import { isSubsetOf, join, areDistinct } from "./helpers";
import LicenseFinder from "./licenseFinder";

class Checker {
    licenseFinder: LicenseFinder;

    constructor() {
        this.licenseFinder = new LicenseFinder();
    }

    private permissionsAreLessRestrictive(license1: License, license2: License) : boolean {
        let permissionsAreSubset = isSubsetOf(license2.permissions, license1.permissions);

        return permissionsAreSubset;
    }

    private prohibitionsAreLessRestrictive(license1: License, license2: License) : boolean {
        let prohibitionsAreSubset = isSubsetOf(license1.prohibitions, license2.prohibitions);

        return prohibitionsAreSubset;
    }

    private dutiesAreLessRestrictive(license1: License, license2: License) : boolean {
        let dutiesAreSubset = isSubsetOf(license1.duties, license2.duties);

        return dutiesAreSubset;
    }

    private allowsRelicensing(license1: License, license2: License): boolean {
        if (license1.metaInformation.id === license2.metaInformation.id) {
            return true;
        }

        let license1AllowsRelicensing = license1.permissions.findIndex((action: Action) => action.id === 27) >= 0;

        return license1AllowsRelicensing;
    }

    private conformsToShareAlike(license1: License, license2: License): boolean {
        if (license1.metaInformation.id === license2.metaInformation.id) {
            return true;
        }

        let hasShareAlikeDuty = license1.duties.findIndex((action: Action) => action.id === 5) >= 0;
        if (hasShareAlikeDuty === false) {
            return true;
        }

        let license2IsIncluded = license1.shareAlikes.findIndex((id: number) => id === license2.metaInformation.id) >= 0;

        return license2IsIncluded;
    }

    isLessRestrictive(license1: License, license2: License) : boolean {
        // Check if it is the same license
        // Then this statement also holds true
        if (license1.metaInformation.id === license2.metaInformation.id) {
            return true;
        }

        // Check the permissions
        let permissionsAreLessRestrictive = this.permissionsAreLessRestrictive(license1, license2);

        // Check the prohibitions
        let prohibitionsAreLessRestrictive = this.prohibitionsAreLessRestrictive(license1, license2);

        // Check the duties
        let dutiesAreLessRestrictive = this.dutiesAreLessRestrictive(license1, license2);

        return permissionsAreLessRestrictive && 
            prohibitionsAreLessRestrictive &&
            dutiesAreLessRestrictive;
    }

    private haveCommonPermissions(license1: License, license2: License): boolean {
        let permissionsAreDistinct = areDistinct(license1.permissions, license2.permissions);

        return permissionsAreDistinct === false;
    }

    private permissionsAreNotProhibited(license1: License, license2: License): boolean {
        let joinedPermissions = join(license1.permissions, license2.permissions);
        let permissionsAreAllowed = join(joinedPermissions, license2.prohibitions).length < joinedPermissions.length;

        return permissionsAreAllowed;
    }

    private bothAllowRelicense(license1: License, license2: License): boolean {
        let license1AllowsRelicensing = this.allowsRelicensing(license1, license2);
        let license2AllowsRelicensing = this.allowsRelicensing(license2, license1);

        return license1AllowsRelicensing && license2AllowsRelicensing;
    }

    private canBeComposed(license1: License, license2: License): boolean {
        let haveCommonPermissions = this.haveCommonPermissions(license1, license2) 
            && this.permissionsAreNotProhibited(license1, license2) 
            && this.permissionsAreNotProhibited(license2, license1);

        let bothAllowRelicense = this.bothAllowRelicense(license1, license2);

        return haveCommonPermissions && bothAllowRelicense;
    }

    private allowCombination(license1: License, license2: License): boolean {
        let license1AllowsDerivatives = license1.permissions.findIndex((action: Action) => action.id === 1) >= 0;
        let license2AllowsDerivatives = license2.permissions.findIndex((action: Action) => action.id === 1) >= 0;

        return license1AllowsDerivatives && license2AllowsDerivatives;
    }

    areCompatible(license1: License, license2: License): CompatibilityCheckResult {
        let license1IsLessRestrictive = this.isLessRestrictive(license1, license2);
        let license1AllowsRelicensing = this.allowsRelicensing(license1, license2);
        let license1ConformsToShareAlike = this.conformsToShareAlike(license1, license2);
        
        let lessRestrictive = license1IsLessRestrictive && license1AllowsRelicensing && license1ConformsToShareAlike;

        let canBeComposed = this.canBeComposed(license1, license2);

        let allowCombination = this.allowCombination(license1, license2);

        let areCompatible = ((license1IsLessRestrictive) ||
                            canBeComposed) && allowCombination;

        return {
            name1: license1.metaInformation.name,
            name2: license2.metaInformation.name,
            lessRestrictive: lessRestrictive,
            canBeComposed: canBeComposed,
            allowCombination: allowCombination,
            areCompatible: areCompatible
        };
    }

    runCompatibilityChecks() : CompatibilityCheckResult[] {
        let licenses = this.licenseFinder.getLicenses();

        let results: CompatibilityCheckResult[] = [];
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

                let result = this.areCompatible(license1, license2);
                results.push(result);
            }    
        }

        return results;
    }
}

export default Checker;