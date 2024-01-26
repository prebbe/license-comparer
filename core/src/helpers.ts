import { LicenseAction, PartialLicenseMatchResult } from "./types";

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

export { areEqual, matchExactly, matchPartially }