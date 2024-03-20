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