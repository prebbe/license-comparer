import {areEqual, matchExactly, matchPartially, join, union } from '../src/helpers';
import type { LicenseAction } from "../src/types";
import { createLicenseAction} from "../src/types";

describe("Testing areEqual", () => {
    test('True, if both licenses actions have the same license id', () => {
        let l1: LicenseAction = createLicenseAction(0, 'test0');

        let l2: LicenseAction = createLicenseAction(0, 'test0');

        expect(areEqual(l1, l2)).toBe(true);
    });

    test('False, if both licenses actions have different license ids', () => {
        let l1: LicenseAction = createLicenseAction(0, 'test0');

        let l2: LicenseAction = createLicenseAction(1, 'test1');

        expect(areEqual(l1, l2)).toBe(false);
    });
})

describe("Testing matchExactly", () => {
    test('True, if both licenses have the exact same license actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        expect(matchExactly(l1, l2)).toBe(true);
    });

    test('False, if the licenses do not have the exact same license actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
        ];

        expect(matchExactly(l1, l2)).toBe(false);
    });

    test('False, if the licenses do not have any common license actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(3, 'test3'),
            createLicenseAction(4, 'test4'),
            createLicenseAction(5, 'test5'),
        ];

        expect(matchExactly(l1, l2)).toBe(false);
    });
})

describe("Testing matchPartially", () => {
    test('True, if both licenses have the exact same license actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        expect(matchPartially(l1, l2)).toBe(true);
    });

    test('True, if the licenses do not have the exact same license actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(3, 'test3'),
        ];

        expect(matchPartially(l1, l2)).toBe(true);
    });

    test('False, if the licenses do not have any common license actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(3, 'test3'),
            createLicenseAction(4, 'test4'),
            createLicenseAction(5, 'test5'),
        ];

        expect(matchPartially(l1, l2)).toBe(false);
    });
})

describe("Testing join", () => {
    test("If both licenses are empty return an empty array", () => {
        let l1: LicenseAction[] = [];
        let l2: LicenseAction[] = [];

        expect(join(l1, l2)).toEqual([]);
    })

    test("If license 1 is empty return an empty array", () => {
        let l1: LicenseAction[] = [];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        expect(join(l1, l2)).toEqual([]);
    })

    test("If license 2 is empty return an empty array", () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [];

        expect(join(l1, l2)).toEqual([]);
    })

    test("If both arrays are the same, return the entire array", () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let expectedResult: LicenseAction[] = [
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2')
        ];

        expect(join(l1, l2)).toEqual(expectedResult);
    })

    test("If both arrays differ, return just the matching elements", () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(2, 'test2'),
            createLicenseAction(3, 'test3'),
            createLicenseAction(4, 'test4'),
        ];

        let expectedResult: LicenseAction[] = [
            createLicenseAction(2, 'test2')
        ];

        expect(join(l1, l2)).toEqual(expectedResult);
    })
})


describe("Testing union", () => {
    test("If both licenses are empty return an empty array", () => {
        let l1: LicenseAction[] = [];
        let l2: LicenseAction[] = [];

        expect(union(l1, l2)).toEqual([]);
    })

    test("If license 1 is empty, return an array matching license2", () => {
        let l1: LicenseAction[] = [];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let expectedResult: LicenseAction[] = [
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })

    test("If license 2 is empty, return an array matching license1", () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [];

        let expectedResult: LicenseAction[] = [
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })

    test("If both arrays are the same, return one array with distinct elements", () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let expectedResult: LicenseAction[] = [
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })

    test("If both arrays differ slightly, return an error with all elements", () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(2, 'test2'),
            createLicenseAction(3, 'test3'),
            createLicenseAction(4, 'test4'),
        ];

        let expectedResult: LicenseAction[] = [
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2'),
            createLicenseAction(3, 'test3'),
            createLicenseAction(4, 'test4')
        ];

        expect(union(l1, l2)).toEqual(expectedResult);
    })
})