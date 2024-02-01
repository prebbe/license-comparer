import { CheckResult, PipelineAggregator } from "../core/dist";

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

export function toJson(): string {
    return pipeline.toJson();
}