import Action from "./Action"
import LicenseMetaInformation from "./MetaInformation"

type License = {
    metaInformation: LicenseMetaInformation;
    permissions: Action[];
    prohibitions: Action[];
    duties: Action[];
    shareAlikes: number[];
}

export default License;