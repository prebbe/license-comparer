import * as fs from 'fs';
import MetaInformation from './entities/MetaInformation';
import ShareAlike from './entities/ShareAlike';
import Action from './entities/Action';
import License from './entities/License';

class DataAccess {
    licenses: License[] = new Array();

    constructor() {
        this.initializeDataAccess();
    }

    private initializeDataAccess() {
        const dataPath = '../data.json';

        let configFileContent = fs.readFileSync(dataPath, 'utf8');
        this.licenses = JSON.parse(configFileContent);
    }

    loadLicenses() : License[] {
        return this.licenses;
    }

    loadLicense(name: string): License | null {
        let license = this.licenses.find((license) => license.metaInformation.name == name);

        if (!license) {
            return null;
        }

        return license;
    }

    loadLicenseById(id: number): License | null {
        let license = this.licenses.find((license) => license.metaInformation.id == id);

        if (!license) {
            return null;
        }

        return license;
    }

    loadLicenseMetainformations(): MetaInformation[] {
        return this.licenses.map((license) => license.metaInformation);
    }

    loadLicenseMetaInformation(name: string): MetaInformation | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.metaInformation;
    }

    loadLicensePermissions(name: string): Action[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.permissions;
    }

    loadLicenseProhibitions(name: string): Action[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.prohibitions;
    }

    loadLicenseDuties(name: string): Action[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.duties;
    }

    loadShareAlikes(name: string): ShareAlike[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.shareAlikes;
    }
}

export default DataAccess;