import CombinedLicense from "./entities/CombinedLicense";
import License from "./entities/License";
import Checks from "./checks";
import { CheckResult } from "./entities/CheckResult";
import Recommender from "./recommender";
import { RecommendationResult } from "./entities/RecommendationResult";
import LicenseFinder from "./licenseFinder";

class PipelineAggregator {
    licenseFinder: LicenseFinder;
    checks: Checks;
    recommender: Recommender;
    result: CombinedLicense | null = null;

    constructor() {
        this.licenseFinder = new LicenseFinder();
        this.checks = new Checks();
        this.recommender = new Recommender();
    }

    getLicense(): CombinedLicense | null {
        return this.result;
    }

    startAggregation(name: string) {
        let license = this.licenseFinder.getLicense(name);
        if (license == null) {
            throw new Error("The selected license does not exist!");
        }

        this.result = new CombinedLicense(license);
    }

    addLicense(name: string) {
        let license = this.licenseFinder.getLicense(name);
        if (license == null) {
            throw new Error("The selected license does not exist!");
        }

        if (this.result == null) {
            throw new Error("You first have to start the aggregation!");
        }
        this.result?.addLicense(license);
    }

    checkLicense(): CheckResult | null {
        if (this.result == null) {
            return null;
        }

        if (this.result.numberOfLicenses == 1) {
            return null;
        }

        return this.checks.checkCombinedLicense(this.result);
    }

    resetLicense() {
        this.result = null;
    }

    toJson() {
        return this.result == null ? '' : this.result.toJson();
    }

    combineLicenses(names: string[]): CombinedLicense {
        if (names.length <= 0) {
            throw new Error("You have to add at least one license");
        }

        let licenses: License[] = this.loadLicenses(names);

        if (licenses.length <= 0) {
            throw new Error("There are no licenses with these names!");
        }

        let combinedLicense = new CombinedLicense(licenses[0]);
        for (let i = 1; i < licenses.length; i++) {
            combinedLicense.addLicense(licenses[i]);
        }

        return combinedLicense;
    }

    getRecommendations(): RecommendationResult[] {
        let recommendations: RecommendationResult[] = [];
        if (this.result === null)
            return recommendations;

        recommendations = this.recommender.findSimilarLicenses(this.result);
        return recommendations;
    }

    private loadLicenses(names: string[]): License[] {
        let result: License[] = [];

        names.forEach((name) => {
            let license = this.licenseFinder.getLicense(name);
            if (license != null) {
                result.push(license);
            }
        });

        return result;
    }
}

export default PipelineAggregator;