import { CheckResult, PipelineAggregator } from "../core/dist";
import { RecommendationResult } from "../core/dist/recommender";

const pipeline = new PipelineAggregator();

export function getLicense() {
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
    return pipeline.checkLicense();
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