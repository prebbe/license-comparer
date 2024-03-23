import Action from '../src/entities/Action';
import {areDistinct, areEqual, contains, isSubsetOf, join, union } from '../src/helpers';
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

describe("Testing contains", () => {
    test("If the list is empty return false", () => {
        let l1: Action[] = [];

        let action: Action = createAction(0, 'test0');

        expect(contains(l1, action)).toEqual(false);
    })

    test("If the list contains the action, return true", () => {
        let l1: Action[] = [
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let action: Action = createAction(0, 'test0');

        expect(contains(l1, action)).toEqual(true);
    })

    test("If the list does not contain the action, return false", () => {
        let l1: Action[] = [
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let action: Action = createAction(0, 'test0')

        expect(contains(l1, action)).toEqual(false);
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