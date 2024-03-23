type CompatibilityCheckResult = {
    name1: string,
    name2: string,

    lessRestrictive: boolean,
    canBeComposed: boolean,

    allowCombination: boolean,

    areCompatible: boolean
};

export default CompatibilityCheckResult;