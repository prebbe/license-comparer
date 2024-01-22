import * as db from './dataAccess';

async function combinePermissions(license1: string, license2: string) {
    let permissions1 = await db.loadPermissionsByName(license1);
    let permissions2 = await db.loadPermissionsByName(license2);

    if (permissions1 == undefined || permissions1.length === 0) {
        return [];
    }

    let result = [];
    for (let i = 0; i < permissions1.length; i++) {
        for (let j = 0; j < permissions2.length; j++) {
            if (permissions1[i].id != permissions2[j].id) {
                continue;
            }

            result.push(permissions1[i]);
        }
    }

    return result;
}

async function combineProhibitions(license1: string, license2: string) {
    let prohibitions1 = await db.loadProhibitionsByName(license1);
    let prohibitions2 = await db.loadProhibitionsByName(license2);

    if (prohibitions1 == undefined || prohibitions1.length === 0) {
        if (prohibitions2 == undefined || prohibitions2.length === 0) {
            return [];
        }

        return prohibitions2;
    }

    let result = prohibitions1;
    
    for (let i = 0; i < prohibitions2.length; i++) {
        let match1 = result.find((p:any) => p.id == prohibitions2[i].id);
        if (match1 != undefined)
            continue;
        
        result.push(prohibitions2[i]);
    }

    return result;
}

async function combineDuties(license1: string, license2: string) {
    let duties1 = await db.loadDutiesByName(license1);
    let duties2 = await db.loadDutiesByName(license2);

    if (duties1 == undefined || duties1.length === 0) {
        if (duties2 == undefined || duties2.length === 0) {
            return [];
        }
        
        return duties2;
    }

    let result = duties1;
    for (let i = 0; i < duties2.length; i++) {
        let match1 = result.find((p:any) => p.id == duties2[i].id);
        if (match1 != undefined)
            continue;
        
        result.push(duties2[i]);
    }

    return result;
}

function cleanPermissions(permissions: any[], prohibitions: any[]) {
    let result = permissions.map((p) => p);
    for (let i = 0; i < prohibitions.length; i++) {
        let prohibition = prohibitions[i];

        let permission = permissions.find((p:any) => p.id == prohibition.id)
        let index = permissions.indexOf(permission);
        if (index < 0) {
            continue;
        }
            
        result.splice(index, 1);
    }

    return result;
}

async function aggregateLicense(license1: string, license1short: string, license2: string, license2short: string) {
    let prohibitions = await combineProhibitions(license1, license2);
    let duties = await combineDuties(license1, license2);

    let combinedPermissions = await combinePermissions(license1, license2);
    let permissions = cleanPermissions(combinedPermissions, prohibitions);

    return { license1short, license2short, permissions, prohibitions, duties };
}

export { aggregateLicense }