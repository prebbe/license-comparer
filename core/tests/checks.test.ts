import Checks from '../src/checks'
import type { LicenseAction, ShareAlikes } from "../src/types";
import { createLicense, createLicenseAction, createLicenseSummary, createShareAlikes } from "../src/types";

describe("Testing canfulfillDuties", () => {
    test('True, if the prohibitions and duties do not have common actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(3, 'test3'),
            createLicenseAction(4, 'test4'),
            createLicenseAction(5, 'test5') 
        ];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(true);
    });

    test('False, if the prohibitions and duties do have common actions', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(0, 'test0'),
            createLicenseAction(1, 'test1'),
            createLicenseAction(2, 'test2') 
        ];

        let l2: LicenseAction[] = [ 
            createLicenseAction(1, 'test1'),
            createLicenseAction(4, 'test4'),
            createLicenseAction(5, 'test5') 
        ];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(false);
    });

    test('True, if there are no prohibitions', () => {
        let l1: LicenseAction[] = [];

        let l2: LicenseAction[] = [ 
            createLicenseAction(1, 'test1'),
            createLicenseAction(4, 'test4'),
            createLicenseAction(5, 'test5') 
        ];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(true);
    });

    test('True, if there are no duties', () => {
        let l1: LicenseAction[] = [ 
            createLicenseAction(1, 'test1'),
            createLicenseAction(4, 'test4'),
            createLicenseAction(5, 'test5') 
        ];
        
        let l2: LicenseAction[] = [];

        expect(Checks.canfulfillDuties(l1, l2)).toBe(true);
    });
})

describe("Testing allowDerivatives", () => {
    test('True, if both licenses allow derivatives', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(1, 'action1'),
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.allowDerivatives(l1, l2)).toBe(true);
    });

    test('False, if only one license allows derivatives', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.allowDerivatives(l1, l2)).toBe(false);
    });

    test('False, if one license allow derivatives, but one prohibits it', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(1, 'action1'),
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.allowDerivatives(l1, l2)).toBe(false);
    });
})

describe("Testing conformToShareAlike", () => {
    test('True, if both licenses do not have share alikes', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(5, 'action5'),
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(true);
    });

    test('True, if one licenses has share alike and list the other as valid', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
       ];
        let l1shareAlikes: ShareAlikes[] = [
            createShareAlikes(0, 0, 'test', '', 1, 'test', '')
        ];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(true);
    });

    test('False, if one licenses has share alike and does not list the other as valid', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
       ];
        let l1shareAlikes: ShareAlikes[] = [
            createShareAlikes(0, 0, 'test', '', 2, 'test', '')
        ];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(false);
    });

    test('True, if both licenses have share alike and list each other as valid', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
       ];
        let l1shareAlikes: ShareAlikes[] = [
            createShareAlikes(0, 0, 'test', '', 1, 'test', '')
        ];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
        ];
        let l2shareAlikes: ShareAlikes[] = [
            createShareAlikes(1, 1, 'test', '', 0, 'test', '')
        ];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(true);
    });

    test('False, if both licenses have share alike, but only one lists the other as valid', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
       ];
        let l1shareAlikes: ShareAlikes[] = [
            createShareAlikes(0, 0, 'test', '', 2, 'test', '')
        ];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
        ];
        let l2shareAlikes: ShareAlikes[] = [
            createShareAlikes(1, 1, 'test', '', 0, 'test', '')
        ];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(false);
    });

    test('False, if both licenses have share alike, but do not lists the other as valid', () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
       ];
        let l1shareAlikes: ShareAlikes[] = [
            createShareAlikes(0, 0, 'test', '', 2, 'test', '')
        ];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [
            createLicenseAction(5, 'action5')
        ];
        let l2shareAlikes: ShareAlikes[] = [
            createShareAlikes(1, 1, 'test', '', 3, 'test', '')
        ];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToShareAlike(l1, l2)).toBe(false);
    });
})

describe("Testing conformToRelicensing", () => {
    test("True, if it is the same license", () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(0, 'test0', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToRelicense(l1, l2)).toBe(true);
    })

    test("False, if only license1 allows relicensing", () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2'), 
            createLicenseAction(27, 'relicensing') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(5, 'action5'),
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("False, if license1 prohibits relicensing", () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2')
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4'), 
            createLicenseAction(27, 'relicensing') 
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(5, 'action5'),
            createLicenseAction(6, 'action6'),
            createLicenseAction(27, 'relicensing')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("False, if only license2 allows relicensing", () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2') 
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(5, 'action5'),
            createLicenseAction(6, 'action6'),
            createLicenseAction(27, 'relicensing')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("False, if license2 prohibits relicensing", () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2'),
            createLicenseAction(27, 'relicensing')
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(5, 'action5'),
            createLicenseAction(6, 'action6')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9'),
            createLicenseAction(27, 'relicensing')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToRelicense(l1, l2)).toBe(false);
    })

    test("True, if both licenses allow relicensing", () => {
        let l1l = createLicense(0, 'test0', '', '', '');
        
        let l1permissions: LicenseAction[] = [ 
            createLicenseAction(0, 'action0'),
            createLicenseAction(1, 'action1'),
            createLicenseAction(2, 'action2'),
            createLicenseAction(27, 'relicensing')
        ];
        let l1prohibitions: LicenseAction[] = [ 
            createLicenseAction(3, 'action3'),
            createLicenseAction(4, 'action4')
        ];
        let l1duties: LicenseAction[] = [];
        let l1shareAlikes: ShareAlikes[] = [];
        
        let l1 = createLicenseSummary(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createLicense(1, 'test1', '', '', '');
        
        let l2permissions: LicenseAction[] = [ 
            createLicenseAction(5, 'action5'),
            createLicenseAction(6, 'action6'),
            createLicenseAction(27, 'relicensing')
        ];
        let l2prohibitions: LicenseAction[] = [ 
            createLicenseAction(7, 'action7'),
            createLicenseAction(8, 'action8'),
            createLicenseAction(9, 'action9')
        ];
        let l2duties: LicenseAction[] = [];
        let l2shareAlikes: ShareAlikes[] = [];
        
        let l2 = createLicenseSummary(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Checks.conformToRelicense(l1, l2)).toBe(true);
    })
})