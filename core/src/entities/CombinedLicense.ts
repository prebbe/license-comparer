import { join, union } from "../helpers";
import Action from "./Action";
import License from "./License";

class CombinedLicense {
    licenses: License[];
    numberOfLicenses: number;
    permissions: Action[];
    prohibitions: Action[];
    duties: Action[];
    
    constructor(license: License
    ) {
        this.licenses = [license];
        this.numberOfLicenses = 1;
        this.permissions = license.permissions;
        this.prohibitions = license.prohibitions;
        this.duties = license.duties;
    }

    addLicense(license: License): CombinedLicense {
        // Add the license to the element (Even if there already is the same license)
        this.numberOfLicenses = this.licenses.push(license);

        // Combine the permissions, prohibitions and duties
        let combinedPermissions = join(this.permissions, license.permissions);
        let combinedProhibitions = union(this.prohibitions, license.prohibitions);
        let combinedDuties = union(this.duties, license.duties);

        this.permissions = combinedPermissions;
        this.prohibitions = combinedProhibitions;
        this.duties = combinedDuties;

        return this;
    }

    toJson(): string {
        return JSON.stringify(this, null, 4);
    }

}

export default CombinedLicense;