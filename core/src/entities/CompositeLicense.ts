import Action from "./Action";
import MetaInformation from "./MetaInformation";

type CompositeLicense = {
    licenses: MetaInformation[],
    permissions: Action[],
    prohibitions: Action[],
    duties: Action[]
}

export default CompositeLicense;