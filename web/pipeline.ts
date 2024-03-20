import { CheckResult, CompositeLicense, Pipeline, RecommendationResult } from "../core/dist/index";

const pipeline = new Pipeline();

export function getLicense() : CompositeLicense | null {
    return pipeline.getLicense();
}

export function addLicense(name: string) {
    if (getLicense() == null) {
        pipeline.startAggregation(name);
    } else {
        pipeline.addLicense(name);
    }
}

export function checkLicense(): CheckResult | null{
    return pipeline.checkLicenses();
}

export function resetLicense() {
    pipeline.resetLicense();
}

export function getRecommendations(): RecommendationResult[] {
    return pipeline.getRecommendations();
}

export function toJson(): string {
    return pipeline.toJson();
}