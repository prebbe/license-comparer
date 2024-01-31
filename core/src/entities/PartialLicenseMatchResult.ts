import Action from "./Action";

type PartialLicenseMatchResult = {
    match : boolean,
    missingElements1: Action[], 
    missingElements2: Action[], 
}

export default PartialLicenseMatchResult;