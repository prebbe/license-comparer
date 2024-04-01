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

import { CheckResult } from "./entities/CheckResult";
import Recommender from "./recommender";
import { RecommendationResult } from "./entities/RecommendationResult";
import LicenseFinder from "./licenseFinder";
import Checker from "./checker";
import CompatibilityCheckResult from "./entities/CompatibilityCheckResult";
import Aggregator from "./aggregator";
import CompositeLicense from "./entities/CompositeLicense";

class Pipeline {
    aggregator: Aggregator;
    checker: Checker;
    licenseFinder: LicenseFinder;
    recommender: Recommender;
    result: CompositeLicense | null = null;

    constructor() {
        this.aggregator = new Aggregator();
        this.checker = new Checker();
        this.licenseFinder = new LicenseFinder();
        this.recommender = new Recommender();
    }

    getLicense(): CompositeLicense | null {
        return this.result;
    }

    startAggregation(name: string) {
        let license = this.licenseFinder.getLicense(name);
        if (license == null) {
            throw new Error("The selected license does not exist!");
        }

        this.result = {
            metainformations: [license.metaInformation],
            numberOfLicenses: 1,
            permissions: license.permissions,
            prohibitions: license.prohibitions,
            duties: license.duties
        };
    }

    addLicense(name: string) {
        let license = this.licenseFinder.getLicense(name);
        if (license == null) {
            throw new Error("The selected license does not exist!");
        }

        if (this.result == null) {
            throw new Error("You first have to start the aggregation!");
        }

        this.result = this.aggregator.extendCompositeLicense(this.result, license);
    }

    checkLicenses(): CheckResult | null {
        if (this.result == null) {
            return null;
        }

        if (this.result.numberOfLicenses == 1) {
            return null;
        }

        let result : boolean = true;
        let checkResults: CompatibilityCheckResult[] = new Array();
        for (var i = 0; i < this.result.numberOfLicenses; i++) {
            for (var j = 0; j < this.result.numberOfLicenses; j++) {
                if (i == j) {
                    continue;
                }

                let license1 = this.licenseFinder.getLicense(this.result.metainformations[i].name);
                let license2 = this.licenseFinder.getLicense(this.result.metainformations[j].name);

                if (license1 == undefined || license2 == undefined) {
                    continue;
                }

                let checkResult = this.checker.areCompatible(license1, license2);

                checkResults.push(checkResult);

                if (checkResult.areCompatible === false) {
                    result = false;
                }
            } 
        } 

        return {
            result: result,
            checks: checkResults
        };
    }

    getRecommendations(): RecommendationResult[] {
        let recommendations: RecommendationResult[] = [];
        if (this.result === null)
            return recommendations;

        recommendations = this.recommender.findSimilarLicenses(this.result);
        return recommendations;
    }

    resetLicense() {
        this.result = null;
    }

    toJson() {
        if (this.result == null)
            return '';
        
        let checkResult = this.checkLicenses();
        let recommendations = this.getRecommendations();

        let summary = {
            check: checkResult,
            aggregation: this.result,
            recommendations: recommendations
        }

        return JSON.stringify(summary, null, 4);
    }
}

export default Pipeline;