import LicenseMetaInformation from "./MetaInformation"

type LicenseDto = {
    metaInformation: LicenseMetaInformation;
    permissions: number[];
    prohibitions: number[];
    duties: number[];
    shareAlikes: number[];
}

export default LicenseDto;