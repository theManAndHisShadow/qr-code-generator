/**
 * @jest-environment jsdom
 */

import { prepareData } from "../src/ts/lib/qr";
import { divideIntoBlocks } from "../src/ts/lib/structurer";
import { getCorrectionBytesAmount, addCorrectionBytes, calculateCorrectionBytes } from "../src/ts/lib/corrector";

let text1 = 'Hello World!';
let text2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
ex ea commodo consequat.
`;

let preparedData1 = prepareData(text1, 'H');
let preparedData2 = prepareData(text2, 'Q')

describe('getCorrectionBytesAmount() returns amount of correction bytes that depends on correction level and version number', () => {
    test('getCorrectionBytesAmount(preparedData1) returns 28', ()=>{
        expect(
            getCorrectionBytesAmount(
                preparedData1.correction, 
                preparedData1.version.number
            )
        ).toBe(28);
    });

    test('getCorrectionBytesAmount(preparedData2) returns 28', ()=>{
        expect(
            getCorrectionBytesAmount(
                preparedData2.correction, 
                preparedData2.version.number
            )
        ).toBe(28);
    });
});



let correctionBytes1 = calculateCorrectionBytes({
    blocks: [
        [
            "01000000",
            "11000100",
            "10000100",
            "01010100",
            "11000100",
            "11000100",
            "11110010",
            "11000010",
            "00000100",
            "10000100",
            "00010100",
            "00100101",
            "00100010",
            "00010000",
            "11101100",
            "00010001"
        ],
    ],
    correction: 'H',
    version:{
        number: 10,
    }
});

describe('calculateCorrectionBytes() returns correction bytes array', () => {
    test('calculateCorrectionBytes(...some object) returns expected value', ()=>{
        expect(correctionBytes1[0]).toEqual([
            "00010000",
            "01010101",
            "00001100",
            "11100111",
            "00110110",
            "00110110",
            "10001100",
            "01000110",
            "01110110",
            "01010100",
            "00001010",
            "10101110",
            "11101011",
            "11000101",
            "01100011",
            "11011010",
            "00001100",
            "11111110",
            "11110110",
            "00000100",
            "10111110",
            "00111000",
            "00100111",
            "11011001",
            "01110011",
            "10111101",
            "11000001",
            "00011000"
        ]);
    });
});


let grouped1 = divideIntoBlocks(preparedData1);
let readyDataObject = addCorrectionBytes(grouped1);

// readyDataObject`s main and correction bytes
// ||
// \/
let flattedBytes = [
    '00100010', '10000011',
    '00001011', '01111000',
    '11010001', '01110010',
    '11011100', '01001101',
    '01000011', '01000000',
    '11101100', '00010001',
    '11101100', '00010001',
    '11101100', '00010001'
];

let flattedCorrectionBytes =     [
    '00101001', '00011000', '11011100',
    '00000101', '01001010', '01100101',
    '00111000', '10000000', '11100001',
    '10011011', '10010001', '01010011',
    '01101001', '10111000', '10111001',
    '11000111', '11001111', '00111001',
    '11110010', '10000011', '10110110',
    '11100101', '01001011', '01110001',
    '11100110', '10111101', '01101111',
    '10101100'
];

describe('addCorrectionBytes() returns new steam with correction bytes', () => {
    test('addCorrectionBytes(...some object) returns expected value', ()=>{
        expect(readyDataObject.stream).toEqual(flattedBytes.concat(flattedCorrectionBytes).join(''));
    });
});