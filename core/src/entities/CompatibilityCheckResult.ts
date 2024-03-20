type CompatibilityCheckResult = {
    name1: string,
    name2: string,

    restrictivenessCheck1: boolean,
    restrictivenessCheck2: boolean,
    canBeComposed: boolean,
    areShareAlikeConform: boolean,

    areCompatible: boolean
};

export default CompatibilityCheckResult;