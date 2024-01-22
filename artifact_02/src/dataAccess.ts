import * as sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

const db_path = '../../data/backend.sqlite'; 

// Disabled to ensure compilation, integrate again later
type License = {
    id: number,
    name: string,
    shortName: string,
    sourceLink: string,
    description: string
};

type Action = {
    id: number,
    origin: string,
    name: string,
    description: string
};

type LicenseAction = {
    id: number,
    name: string
}

type ShareAlikes = {
    id: number,
    licenseId1: number,
    licenseName1: string,
    licenseShortName1: string,
    licenseId2: number,
    licenseName2: string,
    licenseShortName2: string,
}

type LicenseSummary = {
    metaInformation : License,
    permissions : LicenseAction[],
    prohibitions : LicenseAction[],
    duties : LicenseAction[],
    shareAlikes : ShareAlikes[]
}

async function loadLicenses(): Promise<License[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = 'SELECT id, name, shortName, sourceLink, description FROM Licenses';
    
    let result:License[] = new Array();
    await db.each(sql, [], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }
        
        if (row !== undefined && row.Id !== null) {
            result.push({ id: row.Id, name: row.Name, shortName: row.ShortName, sourceLink: row.SourceLink, description: row.Description });    
        }
    });

    await db.close()

    return result;
}

async function loadActions(): Promise<Action[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = 'SELECT id, origin, name, description FROM Actions';
    
    let result:Action[] = new Array();
    await db.each(sql, [], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }
        
        if (row !== undefined && row.Id !== null) {
            result.push({ id: row.Id, origin: row.Origin, name: row.Name, description: row.Description });    
        }
    });

    await db.close()

    return result;
}

async function loadPermissions(): Promise<LicenseAction[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT a.id aid, a.name aname
                FROM Licenses l
                LEFT JOIN Permissions p ON l.id = p.LicenseId
                LEFT JOIN Actions a ON a.id = p.ActionId`;
    
    let result:LicenseAction[] = new Array();
    await db.each(sql, [], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }
        
        if (row !== undefined && row.aid !== null) {
            result.push({ id: row.aid, name: row.aname  });   
        } 
    });

    await db.close()

    return result;
}

async function loadPermissionsByName(licenseName: string): Promise<LicenseAction[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT a.id aid, a.name aname
                FROM Licenses l
                LEFT JOIN Permissions p ON l.id = p.LicenseId
                LEFT JOIN Actions a ON a.id = p.ActionId
                WHERE l.name = ?`;
    
    let result:LicenseAction[] = new Array();
    await db.each(sql, [licenseName], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }
        
        if (row !== undefined && row.aid !== null) {
            result.push({ id: row.aid, name: row.aname  });   
        }
    });

    await db.close()

    return result;
}

async function loadProhibitions(): Promise<LicenseAction[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT a.id aid, a.name aname
                FROM Licenses l
                LEFT JOIN Prohibitions p ON l.id = p.LicenseId
                LEFT JOIN Actions a ON a.id = p.ActionId`;
    
    let result:LicenseAction[] = new Array();
    await db.each(sql, [], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }

        if (row !== undefined && row.aid !== null) {
            result.push({ id: row.aid, name: row.aname  });
        }
    });

    await db.close()

    return result;
}

async function loadProhibitionsByName(licenseName: string): Promise<LicenseAction[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT a.id aid, a.name aname
                FROM Licenses l
                LEFT JOIN Prohibitions p ON l.id = p.LicenseId
                LEFT JOIN Actions a ON a.id = p.ActionId
                WHERE l.name = ?`;
    
    let result:LicenseAction[] = new Array();
    await db.each(sql, [licenseName], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }

        if (row !== undefined && row.aid !== null) {
            result.push({ id: row.aid, name: row.aname  });    
        }
    });

    await db.close()

    return result;
}

async function loadDuties(): Promise<LicenseAction[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT a.id aid, a.name aname
                FROM Licenses l
                LEFT JOIN Duties d ON l.id = d.LicenseId
                LEFT JOIN Actions a ON a.id = d.ActionId`;
    
    let result:LicenseAction[] = new Array();
    await db.each(sql, [], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }

        if (row !== undefined && row.aid !== null) {
            result.push({ id: row.aid, name: row.aname  });    
        }
    });

    await db.close()

    return result;
}

async function loadDutiesByName(licenseName: string): Promise<LicenseAction[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT a.id aid, a.name aname
                FROM Licenses l
                LEFT JOIN Duties d ON l.id = d.LicenseId
                LEFT JOIN Actions a ON a.id = d.ActionId
                WHERE l.name = ?`;
    
    let result:LicenseAction[] = new Array();
    await db.each(sql, [licenseName], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }

        if (row !== undefined && row.aid !== null) {
            result.push({ id: row.aid, name: row.aname });    
        }
    });

    await db.close()

    return result;
}

async function loadShareAlikes(): Promise<ShareAlikes[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT s.id sid, l1.id lid1, l1.name lname1, l1.shortName lshortname1, l2.id lid2, l2.name lname2, l2.shortName lshortname2 
                FROM ShareAlikes s
                LEFT JOIN Licenses l1 ON s.id = l1.id
                LEFT JOIN Licenses l2 ON s.id = l2.id`;
    
    let result:ShareAlikes[] = new Array();
    await db.each(sql, [], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }
        
        if(row !== undefined && row.sid !== null) {
            result.push({ 
                id: row.sid,
                licenseId1: row.lid1,
                licenseName1: row.lname1,
                licenseShortName1: row.lshortname1,
                licenseId2: row.lid2,
                licenseName2: row.lname2,
                licenseShortName2: row.lshortname2
            });    
        }
    });

    await db.close()

    return result;
}

async function loadShareAlikesByName(licenseName: string): Promise<ShareAlikes[]> {
    let db = await sqlite.open({filename: db_path, driver:sqlite3.Database});

    let sql = `SELECT s.id sid, l1.id lid1, l1.name lname1, l1.shortName lshortname1, l2.id lid2, l2.name lname2, l2.shortName lshortname2 
                FROM ShareAlikes s
                LEFT JOIN Licenses l1 ON s.id = l1.id
                LEFT JOIN Licenses l2 ON s.id = l2.id
                WHERE l1.name = ?`;
    
    let result:ShareAlikes[] = new Array();
    await db.each(sql, [licenseName], (err: Error, row: any) => {
        if (err) {
            return console.error(err.message);
        }
        
        if(row !== undefined && row.sid !== null) {
            result.push({ 
                id: row.sid,
                licenseId1: row.lid1,
                licenseName1: row.lname1,
                licenseShortName1: row.lshortname1,
                licenseId2: row.lid2,
                licenseName2: row.lname2,
                licenseShortName2: row.lshortname2
            });
        }
    });

    await db.close()

    return result;
}

function isSubsetOfLicenseActions(actions1: LicenseAction[], actions2: LicenseAction[]) {
    let isFullyIncluded = true;
    let isPartiallyIncluded = false;
    actions1.forEach((action1) => {
        let match = actions2.find((action2) => action2.id == action1.id);
        let isIncluded = match != undefined;

        if (isIncluded) {
            isPartiallyIncluded = true;
        }

        if (!isIncluded) {
            isFullyIncluded = false;
        }
    });

    return { isFullyIncluded, isPartiallyIncluded };
}

async function licenseInformation(): Promise<LicenseSummary[]> {
    let licenses = await loadLicenses();

    let result:LicenseSummary[] = new Array();
    for (const license1 of licenses) {
        let permissions = await loadPermissionsByName(license1.name);
        let prohibitions = await loadProhibitionsByName(license1.name);
        let duties = await loadDutiesByName(license1.name);
        let shareAlikes = await loadShareAlikesByName(license1.name);

        result.push({
            metaInformation: license1,
            permissions: permissions, 
            prohibitions: prohibitions, 
            duties: duties,
            shareAlikes: shareAlikes
         });
    }

    return result;
}

export type {
    License, 
    Action, 
    LicenseAction, 
    ShareAlikes, 
    LicenseSummary
}

export {
    loadLicenses,
    loadActions,
    loadPermissions,
    loadPermissionsByName,
    loadProhibitions,
    loadProhibitionsByName,
    loadDuties,
    loadDutiesByName,
    loadShareAlikes,
    loadShareAlikesByName,
    isSubsetOfLicenseActions,
    licenseInformation
}