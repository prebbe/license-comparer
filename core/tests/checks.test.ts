import Checks from '../src/checks'
import Action from '../src/entities/Action';
import { createLicense, createAction, createMetaInformation } from "./typehelper";

describe("Testing canfulfillDuties", () => {
    test('True, if the prohibitions and duties do not have common actions', () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(3, 'test3'),
            createAction(4, 'test4'),
            createAction(5, 'test5') 
        ];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(true);
    });

    test('False, if the prohibitions and duties do have common actions', () => {
        let l1: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];

        let l2: Action[] = [ 
            createAction(1, 'test1'),
            createAction(4, 'test4'),
            createAction(5, 'test5') 
        ];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(false);
    });

    test('True, if there are no prohibitions', () => {
        let l1: Action[] = [];

        let l2: Action[] = [ 
            createAction(1, 'test1'),
            createAction(4, 'test4'),
            createAction(5, 'test5') 
        ];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(true);
    });

    test('True, if there are no duties', () => {
        let l1: Action[] = [ 
            createAction(1, 'test1'),
            createAction(4, 'test4'),
            createAction(5, 'test5') 
        ];
        
        let l2: Action[] = [];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(true);
    });
})

describe("Testing allowDerivatives", () => {
    test('True, if both licenses allow derivatives', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(1, 'action1'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.allowDerivatives(l1, l2)).toBe(true);
    });

    test('False, if only one license allows derivatives', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.allowDerivatives(l1, l2)).toBe(false);
    });

    test('False, if one license allow derivatives, but one prohibits it', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(1, 'action1'),
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.allowDerivatives(l1, l2)).toBe(false);
    });
})

describe("Testing conformToShareAlike", () => {
    test('True, if both licenses do not have share alikes', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(true);
    });

    test('True, if one licenses has share alike and list the other as valid', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [
            createAction(5, 'action5')
       ];
        let l1ShareAlike: number[] = [1];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(true);
    });

    test('False, if one licenses has share alike and does not list the other as valid', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [
            createAction(5, 'action5')
       ];
        let l1ShareAlike: number[] = [2];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(false);
    });

    test('True, if both licenses have share alike and list each other as valid', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [
            createAction(5, 'action5')
       ];
        let l1ShareAlike: number[] = [1];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [
            createAction(5, 'action5')
        ];
        let l2ShareAlike: number[] = [0];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(true);
    });

    test('False, if both licenses have share alike, but only one lists the other as valid', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [
            createAction(5, 'action5')
       ];
        let l1ShareAlike: number[] = [2];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [
            createAction(5, 'action5')
        ];
        let l2ShareAlike: number[] = [0];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(false);
    });

    test('False, if both licenses have share alike, but do not lists the other as valid', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [
            createAction(5, 'action5')
       ];
        let l1ShareAlike: number[] = [2];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [
            createAction(5, 'action5')
        ];
        let l2ShareAlike: number[] = [3];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(false);
    });
})

describe("Testing conformToRelicensing", () => {
    test("True, if it is the same license", () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(0, 'test0', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l2prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToRelicense(l1, l2)).toBe(true);
    })

    test("False, if only license1 allows relicensing", () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2'), 
            createAction(27, 'relicensing') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("False, if license1 prohibits relicensing", () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2')
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4'), 
            createAction(27, 'relicensing') 
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6'),
            createAction(27, 'relicensing')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("False, if only license2 allows relicensing", () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6'),
            createAction(27, 'relicensing')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("False, if license2 prohibits relicensing", () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2'),
            createAction(27, 'relicensing')
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9'),
            createAction(27, 'relicensing')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("True, if both licenses allow relicensing", () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2'),
            createAction(27, 'relicensing')
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4')
        ];
        let l1duties: Action[] = [];
        let l1ShareAlike: number[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1ShareAlike);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6'),
            createAction(27, 'relicensing')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2ShareAlike: number[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2ShareAlike);

        expect(Checks.conformToRelicense(l1, l2)).toBe(true);
    })
})