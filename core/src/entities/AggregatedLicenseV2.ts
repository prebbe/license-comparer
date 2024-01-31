import Action from "./Action"
import License from "./License"

type AggregatedLicenseV2 = {
    license1: License,
    license2: License,
    permissions: Action[],
    prohibitions: Action[],
    duties: Action[]
}

export default AggregatedLicenseV2;