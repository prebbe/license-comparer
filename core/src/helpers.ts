import { LicenseAction } from "./types";

function isSubsetOf(actions1: LicenseAction[], actions2: LicenseAction[]) {
    let isFullyIncluded = true;
    let isPartiallyIncluded = false;
    actions1.forEach((action1) => {
        let match = actions2.find((action2) => action2.id == action1.id);
        let isIncluded = match != undefined;

        if (isIncluded) {
            isPartiallyIncluded = true;
        }

        if (!isIncluded) {
            isFullyIncluded = false;
        }
    });

    return { isFullyIncluded, isPartiallyIncluded };
}

export { isSubsetOf }