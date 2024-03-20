import Action from "./Action";
import MetaInformation from "./MetaInformation";

type CompositeLicense = {
    metainformations: MetaInformation[],
    numberOfLicenses: number;
    permissions: Action[],
    prohibitions: Action[],
    duties: Action[]
}

export default CompositeLicense;