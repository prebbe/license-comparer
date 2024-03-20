import Action from "./Action"

type RecommendationResult = {
    comparisonResult: CombinedComparisonResult,
    name: string
}

type CombinedComparisonResult = {
    permissionCheck: ComparisonResult,
    prohibitionCheck: ComparisonResult,
    dutyCheck: ComparisonResult,

    isEqual: boolean,
    isMoreRestrictive: boolean
}

type ComparisonResult = {
    additionalActions: Action[],
    missingActions: Action[]
}

export type { RecommendationResult, CombinedComparisonResult, ComparisonResult };