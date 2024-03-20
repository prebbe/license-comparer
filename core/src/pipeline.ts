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

                let checkResult = this.checker.AreCompatible(license1, license2);

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
        return this.result == null ? '' : JSON.stringify(this.result, null, 4);
    }
}

export default Pipeline;