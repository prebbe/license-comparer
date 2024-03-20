import License from './entities/License';
import Action from './entities/Action';
import MetaInformation from './entities/MetaInformation';
import LicenseCompatibilityCheckResult from './entities/LicenseCompatibilityCheckResult';
import AggregatedLicense from './entities/AggregatedLicense';
import { CheckResult, SingleCheckResult } from './entities/CheckResult';

import DataAccess from './dataAccess';
import Aggregator from './aggregator';
import PipelineAggregator from './pipelineAggregator';
import LicenseFinder from './licenseFinder';
import Checks from './checks';
import Checker from './checker';

export type { 
    License,
    Action,
    MetaInformation,
    LicenseCompatibilityCheckResult,
    AggregatedLicense,
    CheckResult,
    SingleCheckResult
}

export { DataAccess, Aggregator, PipelineAggregator, LicenseFinder, Checks, Checker }