import { LicenseSummary } from "./dataAccess";

const db = require('./dataAccess');
const checker = require('./checker');
const aggregator = require('./aggregator');

export async function runFullCompatibilityCheck() {
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

export async function runPartialCompatibilityCheck() {
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

export async function runCompleteAggregation() {
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

export function licenseInformation(): Promise<LicenseSummary[]> {
    return db.licenseInformation();
}

// Just for testing purposes
// (async() => {
//     let info = await licenseInformation();

//     const json = JSON.stringify(info, null, 2);
//     console.log(json);
    
// })();