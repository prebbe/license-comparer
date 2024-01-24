import { License, LicenseAction, LicenseSummary, LicenseCompatibilityCheckResult, AggregatedLicense } from "./types";

import DataAccess from './dataAccessV2';
import CompatibilityChecker from './checkerV2';
import Aggregator from './aggregatorV2';

export type { License, LicenseAction, LicenseSummary, LicenseCompatibilityCheckResult, AggregatedLicense }
export { DataAccess, CompatibilityChecker, Aggregator }