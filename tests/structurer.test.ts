import {prepareData} from '../src/ts/qr';
import {divideIntoBlocks, getBlocksAmount} from '../src/ts/structurer';

let text1 = 'Hello';
let text2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
ex ea commodo consequat.
`;

let preparedData1 = prepareData(text1, 'M');
let preparedData2 = prepareData(text2, 'Q');

describe('getBlocksAmount() return amount of data blocks', () => {
    test('getBlocksAmount("preparedData1", "M") returns 1 block of data', () => {
        expect(
            getBlocksAmount(
                preparedData1.correction,
                preparedData1.version.number
                )
            ).toBe(1);
    });

    test('getBlocksAmount("preparedData2", "M") returns 8 block of data', () => {
        expect(
            getBlocksAmount(
                preparedData2.correction,
                preparedData2.version.number
                )
            ).toBe(8);
    });
});


let blocks1 = divideIntoBlocks(preparedData1).blocks;
let blocks2 = divideIntoBlocks(preparedData2).blocks;

describe('divideIntoBlocks() devide bit stream to blocks using encoding version', () => {
    test('divideIntoBlocks("preparedData1") returns ', () => {
        expect(blocks1).toEqual(expect.arrayContaining([[
            '00100000', '11100011', '00001011', '01111000', 
            '11001100', '00000000', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001'
        ]]));
    });

    test('divideIntoBlocks("preparedData2") returns ', () => {
        expect(
            blocks2
        ).toEqual(expect.arrayContaining([[
            '00010101', '00001100', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001', 
            '11101100', '00010001', '11101100'
        ]]));
    });
});
