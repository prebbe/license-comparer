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