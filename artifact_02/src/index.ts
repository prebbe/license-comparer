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

// Just for testing purposes
// (async() => {
//     // var actions1 = await db.loadPermissionsByName('Creative Commons Attribution-NonCommercial License 4.0');
//     // console.log(actions1);
    

//     var actions2 = await db.loadDutiesByName('Creative Commons Zero');
//     console.log(actions2);

//     // var result = await db.isSubsetOfLicenseActions(actions1, actions2);

//     // var result = await checker.conformToShareAlike('Creative Commons Attribution-NonCommercial License 4.0', 'Creative Commons Attribution-NonCommercial License 4.0');
//     // console.log(result);
// })();