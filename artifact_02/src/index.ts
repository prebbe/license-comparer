import { LicenseSummary } from "./dataAccess";

import * as db from './dataAccess';
import * as checker from './checker';
import * as aggregator from './aggregator';

async function runFullCompatibilityCheck() {
    let licenses = await db.loadLicenses();

    let result = [];
    
    for (const license1 of licenses) {
        for (const license2 of licenses) {
            let checkResult = await checker.checkFullCompatibility(license1.name, license2.name);

            result.push(checkResult);
        }
    }
    
    return result;
}

async function runPartialCompatibilityCheck() {
    let licenses = await db.loadLicenses();

    let result = [];
    for (const license1 of licenses) {
        for (const license2 of licenses) {
            let checkResult = await checker.checkPartialCompatibility(license1.name, license2.name);

            result.push(checkResult);
        }
    }

    return result;
}

async function runCompleteAggregation() {
    let licenses = await db.loadLicenses();

    let result = [];
    for (const license1 of licenses) {
        for (const license2 of licenses) {
            let checkResult = await aggregator.aggregateLicense(license1.name, license1.shortName, license2.name, license2.shortName);

            result.push(checkResult);
        }
    }

    return result;
}

function licenseInformation(): Promise<LicenseSummary[]> {
    return db.licenseInformation();
}

export {
    licenseInformation,
    runPartialCompatibilityCheck,
    runFullCompatibilityCheck,
    runCompleteAggregation
};