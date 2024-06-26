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

import { describe, test, expect } from '@jest/globals';

import Action from '../src/entities/Action';
import {areDistinct, areEqual, isSubsetOf, join, union } from '../src/helpers';
import { createAction } from './typehelper';

describe("Testing areEqual", () => {
    test('True, if both licenses actions have the same license id', () => {
        let l1: Action = createAction(0, 'test0');

        let l2: Action = createAction(0, 'test0');

        expect(areEqual(l1, l2)).toBe(true);
    });

    test('False, if both licenses actions have different license ids', () => {
        let l1: Action = createAction(0, 'test0');

        let l2: Action = createAction(1, 'test1');

        expect(areEqual(l1, l2)).toBe(false);
    });
})

describe("Testing join", () => {
    test("If both licenses are empty return an empty array", () => {
        let l1: Action[] = [];
        let l2: Action[] = [];

        expect(join(l1, l2)).toEqual([]);
    })

    test("If license 1 is empty return an empty array", () => {
        let l1: Action[] = [];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        expect(join(l1, l2)).toEqual([]);
    })

    test("If license 2 is empty return an empty array", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [];

        expect(join(l1, l2)).toEqual([]);
    })

    test("If both arrays are the same, return the entire array", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let expectedResult: Action[] = [
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2')
        ];

        expect(join(l1, l2)).toEqual(expectedResult);
    })

    test("If both arrays differ, return just the matching elements", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(2, 'test2'),
            createAction(3, 'test3'),
            createAction(4, 'test4'),
        ];

        let expectedResult: Action[] = [
            createAction(2, 'test2')
        ];

        expect(join(l1, l2)).toEqual(expectedResult);
    })
})

describe("Testing union", () => {
    test("If both licenses are empty return an empty array", () => {
        let l1: Action[] = [];
        let l2: Action[] = [];

        expect(union(l1, l2)).toEqual([]);
    })

    test("If license 1 is empty, return an array matching license2", () => {
        let l1: Action[] = [];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let expectedResult: Action[] = [
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })

    test("If license 2 is empty, return an array matching license1", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [];

        let expectedResult: Action[] = [
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })

    test("If both arrays are the same, return one array with distinct elements", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let expectedResult: Action[] = [
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })

    test("If both arrays differ slightly, return an error with all elements", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(2, 'test2'),
            createAction(3, 'test3'),
            createAction(4, 'test4'),
        ];

        let expectedResult: Action[] = [
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2'),
            createAction(3, 'test3'),
            createAction(4, 'test4')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })
})

describe("Testing isSubsetOf", () => {
    test("If both licenses are empty return true", () => {
        let l1: Action[] = [];
        let l2: Action[] = [];

        expect(isSubsetOf(l1, l2)).toEqual(true);
    })

    test("If license 1 is empty, return true", () => {
        let l1: Action[] = [];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        expect(isSubsetOf(l1, l2)).toEqual(true);
    })

    test("If license 2 is empty, return false", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [];

        expect(isSubsetOf(l1, l2)).toEqual(false);
    })

    test("If both arrays are the same, return true", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        expect(isSubsetOf(l1, l2)).toEqual(true);
    })

    test("If array 1 is completely included, return true", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1')
        ];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2')
        ];

        expect(isSubsetOf(l1, l2)).toEqual(true);
    })

    test("If array 1 is not completely included, return false", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(2, 'test2'),
            createAction(3, 'test3'),
            createAction(4, 'test4'),
        ];

        expect(isSubsetOf(l1, l2)).toEqual(false);
    })
})

describe("Testing areDistinct", () => {
    test("If both licenses are empty return true", () => {
        let l1: Action[] = [];
        let l2: Action[] = [];

        expect(areDistinct(l1, l2)).toEqual(true);
    })

    test("If license 1 is empty, return true", () => {
        let l1: Action[] = [];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        expect(areDistinct(l1, l2)).toEqual(true);
    })

    test("If license 2 is empty, return true", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [];

        expect(areDistinct(l1, l2)).toEqual(true);
    })

    test("If both arrays are the same, return false", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        expect(areDistinct(l1, l2)).toEqual(false);
    })

    test("If array 1 is completely included, return false", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1')
        ];

        let l2: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2')
        ];

        expect(areDistinct(l1, l2)).toEqual(false);
    })

    test("If array 1 is partially included, return false", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(2, 'test2'),
            createAction(3, 'test3'),
            createAction(4, 'test4'),
        ];

        expect(areDistinct(l1, l2)).toEqual(false);
    })

    test("If arrays are completely distinct, return true", () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1')
        ];

        let l2: Action[] = [ 
            createAction(2, 'test2'),
            createAction(3, 'test3'),
            createAction(4, 'test4'),
        ];

        expect(areDistinct(l1, l2)).toEqual(true);
    })
})