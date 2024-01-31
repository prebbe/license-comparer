import Action from "./Action";
import MetaInformation from "./MetaInformation";

type AggregatedLicense = {
    license1: MetaInformation,
    license2: MetaInformation,
    permissions: Action[],
    prohibitions: Action[],
    duties: Action[]
}

export default AggregatedLicense;