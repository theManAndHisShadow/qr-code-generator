import {getAligmentPatternsPos, getModulesAmount} from '../src/ts/lib/renderer';

let version1 = 1;
let version2 = 2;
let version28 = 28;

describe('getAligmentPatternsPos() returns aligment anchor positions', () => {
    test('getAligmentPatternsPos(version2) returns array [18]', () => {
        expect(getAligmentPatternsPos(version2)).toEqual([18]);
    });

    test('getAligmentPatternsPos(version28) returns array [6, 26, 50, 74, 98, 122]', () => {
        expect(getAligmentPatternsPos(version28)).toEqual([6, 26, 50, 74, 98, 122]);
    });
});

describe('getModulesAmount() returns qr code module size', () => {
    test('getModulesAmount(version1) returns module size - 21', () => {
        expect(getModulesAmount(version1)).toEqual(29);
    });

    test('getModulesAmount(version2) returns module size - 33', () => {
        expect(getModulesAmount(version2)).toEqual(33);
    });

    test('getModulesAmount(version28) returns module size - 137', () => {
        expect(getModulesAmount(version28)).toEqual(137);
    });
});