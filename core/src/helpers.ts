// Copyright 2024 Philip Rebbe

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Action from "./entities/Action";

function areEqual(actions1: Action, actions2: Action) {
    return actions1.id === actions2.id;
}

function join(actions1: Action[], actions2: Action[]): Action[] {
    let results: Action[] = [];

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

function union(actions1: Action[], actions2: Action[]): Action[] {
    let combinedActions = actions1.concat(actions2);

    let reducedActions: Action[] = [];
    for (let i = 0; i < combinedActions.length; i++) {
        let action = combinedActions[i];
        if (reducedActions.findIndex((ra) => areEqual(ra, action)) < 0) {
            reducedActions.push(action);
        }
    }
    
    return reducedActions;
}

function isSubsetOf(actions1: Action[], actions2: Action[]) : boolean {
    let result = true;
    for(let i = 0; i < actions1.length; i++) {
        let action1 = actions1[i];
        let index = actions2.findIndex((action2) => areEqual(action1, action2));

        if (index < 0) {
            result = false;
            break;
        }
    }

    return result;
}

function areDistinct(actions1: Action[], actions2: Action[]) : boolean {
    let result = true;
    for(let i = 0; i < actions1.length; i++) {
        let index = actions2.findIndex((action2) => areEqual(action2, actions1[i]));

        if (index >= 0) {
            result = false;
            break;
        }
    }

    if (result === false) {
        return false;
    }

    for(let i = 0; i < actions2.length; i++) {
        let index = actions1.findIndex((action1) => areEqual(action1, actions2[i]));

        if (index >= 0) {
            result = false;
            break;
        }
    }

    return result;
}



export { areEqual, join, union, isSubsetOf, areDistinct }