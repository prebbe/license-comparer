import License from './entities/License';
import Action from './entities/Action';
import MetaInformation from './entities/MetaInformation';
import LicenseCompatibilityCheckResult from './entities/LicenseCompatibilityCheckResult';
import AggregatedLicense from './entities/AggregatedLicense';

import DataAccess from './dataAccess';
import Aggregator from './aggregator';

export type { License, Action, MetaInformation, LicenseCompatibilityCheckResult, AggregatedLicense }
export { DataAccess, Aggregator }