import Action from "./Action"
import LicenseMetaInformation from "./MetaInformation"
import ShareAlike from "./ShareAlike"

type License = {
    metaInformation: LicenseMetaInformation;
    permissions: Action[];
    prohibitions: Action[];
    duties: Action[];
    shareAlikes: ShareAlike[];
}

export default License;