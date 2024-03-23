import License from './entities/License';
import DataAccess from './dataAccess';

class LicenseFinder {
    db: DataAccess;

    constructor() {
        this.db = new DataAccess();
    }

    getLicenses() : License[] {
        return this.db.licenses;
    }

    getLicense(name: string) : License | undefined {
        return this.db.licenses.find((license) => license.metaInformation.name == name);
    }
    
    getLicenseById(id: number): License | undefined {
        return this.db.licenses.find((license) => license.metaInformation.id == id);
    }
}

export default LicenseFinder;