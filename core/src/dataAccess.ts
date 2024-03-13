import * as fs from 'fs';
import MetaInformation from './entities/MetaInformation';
import Action from './entities/Action';
import License from './entities/License';
import LicenseDto from './entities/LicenseDto';

class DataAccess {
    actions: Action[] = new Array();
    licenses: License[] = new Array();

    constructor() {
        this.initializeDataAccess();
    }

    private initializeDataAccess() {
        const actionDataPath = '../data/actions';
        let actionFileNames = fs.readdirSync(actionDataPath);
        actionFileNames.forEach((filename) => {
            let actionFileContent = fs.readFileSync(`${actionDataPath}/${filename}`, 'utf-8');
            let action: Action = JSON.parse(actionFileContent);
            
            this.actions.push(action);
        })

        const licenseDataPath = '../data/licenses';
        let licenseDtos: LicenseDto[] = new Array();
        let licenseFilenames = fs.readdirSync(licenseDataPath);
        
        licenseFilenames.forEach((filename) => {
            let licenseFileContent = fs.readFileSync(`${licenseDataPath}/${filename}`, 'utf-8');
            let licenseDto: LicenseDto = JSON.parse(licenseFileContent);
            
            licenseDtos.push(licenseDto);
        });
        
        for (let i = 0; i < licenseDtos.length; i++) {
            let permissions = this.mapDtoActionsToConcreteActions(licenseDtos[i].permissions);

            let prohibitions = this.mapDtoActionsToConcreteActions(licenseDtos[i].prohibitions);

            let duties = this.mapDtoActionsToConcreteActions(licenseDtos[i].duties);

            let license: License = {
                metaInformation: licenseDtos[i].metaInformation, 
                permissions: permissions,
                prohibitions: prohibitions,
                duties: duties,
                shareAlikes: licenseDtos[i].shareAlikes
            };

            this.licenses.push(license);
        }
    }

    private mapDtoActionsToConcreteActions(actionIds: number[]) : Action[] {
        let actions: Action[] = new Array();

        for(let i = 0; i < actionIds.length; i++) {
            let index = this.actions.findIndex((action) => action.id == actionIds[i]);

            if (index < 0)
                continue;
                
            actions.push(this.actions[index]);
        }

        return actions;
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

    loadShareAlikes(name: string): number[] | null {
        let license = this.licenses.find((license) => license.metaInformation.name === name);

        if (!license) {
            return null;
        }

        return license.shareAlikes;
    }
}

export default DataAccess;