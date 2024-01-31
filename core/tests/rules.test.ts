import Action from "../src/entities/Action";
import ShareAlike from "../src/entities/ShareAlike";
import { Rules } from "../src/rules";

import { createLicense, createAction, createMetaInformation, createShareAlike } from "./typehelper";

describe("Testing permissionsAreCompatible", () => {
    test('True, if both licenses have the exact same license actions', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];
        let l1prohibitions: Action[] = [];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];
        let l2prohibitions: Action[] = [];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.permissionsAreCompatible(l1, l2)).toBe(true);
    });


    test('False, if the licenses do not have the exact same license actions', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1')
        ];
        let l1prohibitions: Action[] = [];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];
        let l2prohibitions: Action[] = [];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.permissionsAreCompatible(l1, l2)).toBe(false);
    });
})

describe("Testing permissionsArePartiallyCompatible", () => {
    test('True, if both licenses have the exact same license actions', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];
        let l1prohibitions: Action[] = [];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];
        let l2prohibitions: Action[] = [];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.permissionsArePartiallyCompatible(l1, l2)).toBe(true);
    });


    test('True, if the licenses do not have the exact same license actions', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1')
        ];
        let l1prohibitions: Action[] = [];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1'),
            createAction(2, 'test2') 
        ];
        let l2prohibitions: Action[] = [];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.permissionsArePartiallyCompatible(l1, l2)).toBe(true);
    });

    test('False, if the licenses do not have any common license actions', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'test0'),
            createAction(1, 'test1')
        ];
        let l1prohibitions: Action[] = [];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(2, 'test0'),
            createAction(3, 'test1'),
            createAction(4, 'test2') 
        ];
        let l2prohibitions: Action[] = [];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.permissionsArePartiallyCompatible(l1, l2)).toBe(false);
    });
})

describe("Testing prohibitionsAndPermissionsAreCompatible", () => {
    test('True, if both licenses have no permission that is prohibited by the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsAreCompatible(l1, l2)).toBe(true);
    });

    test('False, if one license has a permission that is prohibited by the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(2, 'action2'),
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsAreCompatible(l1, l2)).toBe(false);
    });

    test('False, if both licenses have a permission that is prohibited by the other license', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4'),
            createAction(5, 'action5'),
        ];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(2, 'action2'),
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsAreCompatible(l1, l2)).toBe(false);
    });

    test('False, if one license prohibits all permissions of the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsAreCompatible(l1, l2)).toBe(false);
    });

    test('False, if both licenses prohibit all permissions of the other license', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4'),
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsAreCompatible(l1, l2)).toBe(false);
    });
})

describe("Testing prohibitionsAndPermissionsArePartiallyCompatible", () => {
    test('True, if both licenses have no permission that is prohibited by the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsArePartiallyCompatible(l1, l2)).toBe(true);
    });

    test('True, if one license has a permission that is prohibited by the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(2, 'action2'),
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsArePartiallyCompatible(l1, l2)).toBe(true);
    });

    test('True, if both licenses have a permission that is prohibited by the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(2, 'action2'),
            createAction(7, 'action7'),
            createAction(8, 'action8'),
            createAction(9, 'action9')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsArePartiallyCompatible(l1, l2)).toBe(true);
    });

    test('False, if one license prohibits all permissions of the other license', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsArePartiallyCompatible(l1, l2)).toBe(false);
    });

    test('False, if both licenses prohibit all permissions of the other license', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4'),
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1duties: Action[] = [];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2')
        ];
        let l2duties: Action[] = [];
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndPermissionsArePartiallyCompatible(l1, l2)).toBe(false);
    });
})

describe("Testing prohibitionsAndDutiesAreCompatible", () => {
    test('True, if both licenses have no duties', () => {
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndDutiesAreCompatible(l1, l2)).toBe(true);
    });

    test('True, if both licenses have no duty that is prohibited by the other license', () => {
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
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];
        let l2duties: Action[] = [ 
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];;
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndDutiesAreCompatible(l1, l2)).toBe(true);
    });

    test('False, if one license has one duty that is prohibited by the other license', () => {
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
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];
        let l2duties: Action[] = [ 
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];;
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndDutiesAreCompatible(l1, l2)).toBe(false);
    });

    test('False, if both licenses have one duty that is prohibited by the other license', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4'),
            createAction(9, 'action9'),
        ];
        let l1duties: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];
        let l2duties: Action[] = [ 
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];;
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndDutiesAreCompatible(l1, l2)).toBe(false);
    });

    test('False, if one license prohibits all duties of the other license', () => {
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
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6'),
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];
        let l2duties: Action[] = [ 
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];;
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndDutiesAreCompatible(l1, l2)).toBe(false);
    });

    test('False, if both licenses have prohibitions that disallow all duties of the other license', () => {
        let l1l = createMetaInformation(0, 'test0', '', '', '');
        
        let l1permissions: Action[] = [ 
            createAction(0, 'action0'),
            createAction(1, 'action1'),
            createAction(2, 'action2') 
        ];
        let l1prohibitions: Action[] = [ 
            createAction(3, 'action3'),
            createAction(4, 'action4'),
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];
        let l1duties: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6')
        ];
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

        let l2l = createMetaInformation(1, 'test1', '', '', '');
        
        let l2permissions: Action[] = [ 
            createAction(7, 'action7'),
            createAction(8, 'action8')
        ];
        let l2prohibitions: Action[] = [ 
            createAction(5, 'action5'),
            createAction(6, 'action6'),
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];
        let l2duties: Action[] = [ 
            createAction(9, 'action9'),
            createAction(10, 'action10'),
            createAction(11, 'action11')
        ];;
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.prohibitionsAndDutiesAreCompatible(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToShareAlike(l1, l2)).toBe(true);
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
        let l1shareAlikes: ShareAlike[] = [
            createShareAlike(0, 0, 'test', '', 1, 'test', '')
        ];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToShareAlike(l1, l2)).toBe(true);
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
        let l1shareAlikes: ShareAlike[] = [
            createShareAlike(0, 0, 'test', '', 2, 'test', '')
        ];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToShareAlike(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [
            createShareAlike(0, 0, 'test', '', 1, 'test', '')
        ];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [
            createShareAlike(1, 1, 'test', '', 0, 'test', '')
        ];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToShareAlike(l1, l2)).toBe(true);
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
        let l1shareAlikes: ShareAlike[] = [
            createShareAlike(0, 0, 'test', '', 2, 'test', '')
        ];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [
            createShareAlike(1, 1, 'test', '', 0, 'test', '')
        ];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToShareAlike(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [
            createShareAlike(0, 0, 'test', '', 2, 'test', '')
        ];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [
            createShareAlike(1, 1, 'test', '', 3, 'test', '')
        ];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToShareAlike(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToRelicense(l1, l2)).toBe(true);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToRelicense(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToRelicense(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToRelicense(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToRelicense(l1, l2)).toBe(false);
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
        let l1shareAlikes: ShareAlike[] = [];
        
        let l1 = createLicense(l1l, l1permissions, l1prohibitions, l1duties, l1shareAlikes);

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
        let l2shareAlikes: ShareAlike[] = [];
        
        let l2 = createLicense(l2l, l2permissions, l2prohibitions, l2duties, l2shareAlikes);

        expect(Rules.conformToRelicense(l1, l2)).toBe(true);
    })
})