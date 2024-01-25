import * as fs from 'fs';

import {License, LicenseAction, ShareAlikes, LicenseSummary} from './types';

class DataAccess {
    licenses: LicenseSummary[] = new Array();

    constructor() {
        this.initializeDataAccess();
    }

    private initializeDataAccess() {
        const dataPath = '../data.json';

        let configFileContent = fs.readFileSync(dataPath, 'utf8');
        this.licenses = JSON.parse(configFileContent);
    }

    loadLicenses() : LicenseSummary[] {
        return this.licenses;
    }

    loadLicense(name: string): LicenseSummary | null {
        let license = this.licenses.find((license) => license.metaInformation.name == name);

        if (!license) {
            return null;
        }

        return license;
    }

    loadLicenseById(id: number): LicenseSummary | null {
        let license = this.licenses.find((license) => license.metaInformation.id == id);

        if (!license) {
            return null;
        }

        return license;
    }

    loadLicenseMetainformations(): License[] {
        return this.licenses.map((license) => license.metaInformation);
    }

    loadLicenseMetaInformation(name: string): License | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.metaInformation;
    }

    loadLicensePermissions(name: string): LicenseAction[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.permissions;
    }

    loadLicenseProhibitions(name: string): LicenseAction[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.prohibitions;
    }

    loadLicenseDuties(name: string): LicenseAction[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.duties;
    }

    loadShareAlikes(name: string): ShareAlikes[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.shareAlikes;
    }
}

export default DataAccess;