type CheckResult = {
    result: boolean,
    checks: SingleCheckResult[]
};

type SingleCheckResult = {
    name1: string,
    name2: string,
    result: boolean
    dutiesCheck: boolean,
    derivativesCheck: boolean,
    shareAlikeCheck: boolean,
    relicensingCheck: boolean
};

export type { CheckResult, SingleCheckResult };