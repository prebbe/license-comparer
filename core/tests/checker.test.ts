import { describe, test, expect } from '@jest/globals';

import Action from '../src/entities/Action';
import Checker from '../src/checker';
import License from '../src/entities/License';

import { createAction, createLicense, createMetaInformation } from './typehelper';

describe("Testing isLessRestrictive", () => {
    test('True, if both licenses have the same license id', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense0();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(true);
    });

    test('False, if license 1 has less permissions and the same prohibitions and duties', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense1();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(false);
    });

    test('True, if license 1 has more permissions and the same prohibitions and duties', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense2();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(true);
    });

    test('True, if license 1 has less duties and the same permissions and prohibitions', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense3();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(true);
    });

    test('False, if license 1 has more duties and the same permissions and prohibitions', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense4();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(false);
    });

    test('True, if license 1 has less prohibitions and the same permissions and duties', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense5();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(true);
    });

    test('False, if license 1 has more prohibitions and the same permissions and duties', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense6();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(false);
    });

    test('True, if license 1 has same permissions, prohibitions and duties', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense7();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(true);
    });

    test('True, if license 1 has permissions that is prohibited by the other', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense8();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(true);
    });

    test('False, if license 1 prohibits permission of the other license', () => {
        let l1 = createTestLicense0();
        let l2 = createTestLicense9();

        var checker = new Checker();
        expect(checker.isLessRestrictive(l1, l2)).toBe(false);
    });
})

// Base-license for the tests
function createTestLicense0(): License {
    let metaInformation = createMetaInformation(0, 'test0', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2'),
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with more permissions and same prohibitions and duties -> L1 is more restrictive
function createTestLicense1(): License {
    let metaInformation = createMetaInformation(1, 'test1', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2'),
        createAction(9, 'action9'),
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with less permissions and same prohibitions and duties -> L1 is less restrictive
function createTestLicense2(): License {
    let metaInformation = createMetaInformation(2, 'test2', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with same permissions and more prohibitions and duties -> L1 is less restrictive
function createTestLicense3(): License {
    let metaInformation = createMetaInformation(3, 'test3', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2')
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
        createAction(9, 'action2'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with same permissions and less prohibitions and duties -> L1 is more restrictive
function createTestLicense4(): License {
    let metaInformation = createMetaInformation(4, 'test4', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2')
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with same permissions and more prohibitions and duties -> L1 is less restrictive
function createTestLicense5(): License {
    let metaInformation = createMetaInformation(5, 'test5', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2')
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
        createAction(9, 'action2'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with less prohibitions and same permissions and duties -> L1 is less restrictive
function createTestLicense6(): License {
    let metaInformation = createMetaInformation(6, 'test6', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2')
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with same permissions, prohibitions and duties -> L1 is less restrictive
function createTestLicense7(): License {
    let metaInformation = createMetaInformation(7, 'test7', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2')
    ];

    let prohibitions = [
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with prohibition that prohibits permission -> L1 is less restrictive
function createTestLicense8(): License {
    let metaInformation = createMetaInformation(8, 'test8', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1')
    ];

    let prohibitions = [
        createAction(2, 'action2'),
        createAction(3, 'action3'),
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}

// License with permission that is normally prohibited  -> L1 is more restrictive
function createTestLicense9(): License {
    let metaInformation = createMetaInformation(9, 'test9', '', '', '');

    let permissions = [
        createAction(0, 'action0'),
        createAction(1, 'action1'),
        createAction(2, 'action2'),
        createAction(3, 'action3')
    ];

    let prohibitions = [
        createAction(4, 'action4'),
        createAction(5, 'action5'),
    ];

    let duties = [
        createAction(6, 'action6'),
        createAction(7, 'action7'),
        createAction(8, 'action8'),
    ];

    let shareAlikes: number[] = [];

    return createLicense(metaInformation, permissions, prohibitions, duties, shareAlikes);
}