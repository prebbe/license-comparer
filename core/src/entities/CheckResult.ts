import CompatibilityCheckResult from "./CompatibilityCheckResult";

type CheckResult = {
    result: boolean,
    checks: CompatibilityCheckResult[]
};

export type { CheckResult };