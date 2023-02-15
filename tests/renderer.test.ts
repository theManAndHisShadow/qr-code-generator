import {getAlignmentAnchorPos, getModuleSize} from '../src/ts/lib/renderer';

let version1 = 1;
let version2 = 2;
let version28 = 28;

describe('getAlignmentAnchorPos() returns aligment anchor positions', () => {
    test('getAlignmentAnchorPos(version2) returns array [18]', () => {
        expect(getAlignmentAnchorPos(version2)).toEqual([18]);
    });

    test('getAlignmentAnchorPos(version28) returns array [6, 26, 50, 74, 98, 122]', () => {
        expect(getAlignmentAnchorPos(version28)).toEqual([6, 26, 50, 74, 98, 122]);
    });
});

describe('getModuleSize() returns qr code module size', () => {
    test('getModuleSize(version1) returns module size - 21', () => {
        expect(getModuleSize(version1)).toEqual(21);
    });

    test('getModuleSize(version2) returns module size - 25', () => {
        expect(getModuleSize(version2)).toEqual(25);
    });

    test('getModuleSize(version28) returns module size - 127', () => {
        expect(getModuleSize(version28)).toEqual(129);
    });
});