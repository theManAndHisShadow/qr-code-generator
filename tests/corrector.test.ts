import { prepareData } from "../src/ts/qr";
import { divideIntoBlocks } from "../src/ts/structurer";
import { getCorrectionBytesAmount, addCorrectionBytes, calculateCorrectionBytes } from "../src/ts/corrector";

let text1 = 'Hello World!';
let text2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
ex ea commodo consequat.
`;

let preparedData1 = prepareData(text1, 'H');
let preparedData2 = prepareData(text2, 'Q')

describe('getCorrectionBytesAmount() returns amount of correction bytes that depends on correction level and version number', () => {
    test('getCorrectionBytesAmount(preparedData1) returns 17', ()=>{
        expect(
            getCorrectionBytesAmount(
                preparedData1.correction, 
                preparedData1.version.number
            )
        ).toBe(17);
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

// readyDataObject`s bytes
// ||
// \/
let flattedBytes = ['00100001', '11101011','00001011', '01111000','11010001', '01110010','11011100', '01001101','01000011', '01000000'];
let flattedCorrectionBytes = [
    '11101001', '10001100','00110010', '10101010','11000101', '10111111','01001000', '11101101',
    '10001011', '00010100','10111011', '00110101','10101111', '10111111','00101100', '10100011','00100100'
];

describe('addCorrectionBytes() returns new steam with correction bytes', () => {
    test('addCorrectionBytes(...some object) returns expected value', ()=>{
        expect(readyDataObject.stream).toEqual(flattedBytes.concat(flattedCorrectionBytes));
    });
});