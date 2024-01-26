import { LicenseAction } from "./types";

function areEqual(actions1: LicenseAction, actions2: LicenseAction) {
    return actions1.id === actions2.id;
}

function matchExactly(actions1: LicenseAction[], actions2: LicenseAction[]): boolean {
    let match = true;
    for(let i = 0; i < actions1.length; i++) {
        let action1 = actions1[i];
        let equivalentIndex = actions2.findIndex((action2) => areEqual(action2, action1));
        
        if (equivalentIndex < 0) {
            match = false;
            break;
        }
    }

    if (!match) {
        return false;
    }
    
    for(let j = 0; j < actions2.length; j++) {
        let action2 = actions2[j];
        let equivalentIndex = actions1.findIndex((action1) => areEqual(action1, action2));
        
        if (equivalentIndex < 0) {
            match = false;
            break;
        }
    }

    return match;
}

function matchPartially(actions1: LicenseAction[], actions2: LicenseAction[]): boolean {
    let match = false;
    for(let i = 0; i < actions1.length; i++) {
        let action1 = actions1[i];
        let equivalentIndex = actions2.findIndex((action2) => areEqual(action2, action1));
        
        if (equivalentIndex >= 0) {
            match = true;
            continue;
        }
    }
    
    for(let j = 0; j < actions2.length; j++) {
        let action2 = actions2[j];
        let equivalentIndex = actions1.findIndex((action1) => areEqual(action1, action2));
        
        if (equivalentIndex >= 0) {
            match = true;
            continue;
        }
    }

    return match;
}

function join(actions1: LicenseAction[], actions2: LicenseAction[]): LicenseAction[] {
    let results: LicenseAction[] = [];

    if ((actions1.length - actions2.length) >= 0) {
        for (let i = 0; i < actions2.length; i++) {
            let action2 = actions2[i];
    
            let index = actions1.findIndex((action1) => areEqual(action1, action2));
            
            if (index >= 0) {
                results.push(action2);
            }
        }
    } else {
        for (let j = 0; j < actions1.length; j++) {
            let action1 = actions1[j];
    
            let index = actions2.findIndex((action2) => areEqual(action2, action1));
            
            if (index >= 0) {
                results.push(action1);
            }
        }
    }

    return results;
}

function union(actions1: LicenseAction[], actions2: LicenseAction[]): LicenseAction[] {
    let combinedActions = actions1.concat(actions2);

    let reducedActions: LicenseAction[] = [];
    for (let i = 0; i < combinedActions.length; i++) {
        let action = combinedActions[i];
        if (reducedActions.findIndex((ra) => areEqual(ra, action)) < 0) {
            reducedActions.push(action);
        }
    }
    
    return reducedActions;
}

export { areEqual, matchExactly, matchPartially, join, union }