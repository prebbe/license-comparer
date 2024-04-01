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

import License from './entities/License';
import Action from './entities/Action';
import MetaInformation from './entities/MetaInformation';
import { CheckResult } from './entities/CheckResult';

import Aggregator from './aggregator';
import Pipeline from './pipeline';
import LicenseFinder from './licenseFinder';
import Checker from './checker';
import CompatibilityCheckResult from './entities/CompatibilityCheckResult';
import { RecommendationResult, CombinedComparisonResult } from './entities/RecommendationResult';
import Recommender from './recommender';
import CompositeLicense from './entities/CompositeLicense';

export type { 
    License,
    Action,
    MetaInformation,
    CheckResult,
    CompositeLicense,
    CompatibilityCheckResult,
    RecommendationResult,
    CombinedComparisonResult
}

export { Aggregator, Pipeline, LicenseFinder, Checker, Recommender }