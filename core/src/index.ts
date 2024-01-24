import { License, LicenseAction, LicenseSummary, LicenseCompatibilityCheckResult, AggregatedLicense } from "./types";

import DataAccess from './dataAccess';
import CompatibilityChecker from './checker';
import Aggregator from './aggregator';

export type { License, LicenseAction, LicenseSummary, LicenseCompatibilityCheckResult, AggregatedLicense }
export { DataAccess, CompatibilityChecker, Aggregator }