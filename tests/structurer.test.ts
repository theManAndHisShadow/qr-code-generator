import {prepareData} from '../src/ts/lib/qr';
import {divideIntoBlocks, getBlocksAmount} from '../src/ts/lib/structurer';


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



let devidedToBlocksData1 = divideIntoBlocks(preparedData1);
let devidedToBlocksData2 = divideIntoBlocks(preparedData2);

describe('divideIntoBlocks() devide bit stream to blocks using encoding version', () => {
    test('divideIntoBlocks("preparedData1") do not change multiplicity of flatted blocks', () => {
        expect(
            devidedToBlocksData1.blocks.flat(1).join('').length % 8
        ).toEqual(0);
    });

    test('divideIntoBlocks("preparedData1") returns expected value', () => {
        expect(devidedToBlocksData1.blocks).toEqual([[
            '00100000', '11100011', '00001011', '01111000', 
            '11001100', '00000000', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001', 
            '11101100', '00010001', '11101100', '00010001'
        ]]);
    });
    
    test('divideIntoBlocks("preparedData2") do not change multiplicity of flatted blocks ', () => {
        expect(
            devidedToBlocksData2.blocks.flat(1).join('').length % 8
        ).toEqual(0);
    });

    test('divideIntoBlocks("preparedData2") returns 8 blocks', () => {
        expect(
            devidedToBlocksData2.blocks.length
        ).toEqual(8);
    });

    test('divideIntoBlocks("preparedData2") 4-th value has 22 bytes ', () => {
        expect(
            devidedToBlocksData2.blocks[3].length
        ).toEqual(22);
    });

    test('divideIntoBlocks("preparedData2") 5-th value has 23 bytes', () => {
        expect(
            devidedToBlocksData2.blocks[4].length
        ).toEqual(23);
    });

    test('divideIntoBlocks("preparedData2") 8-th value has 23 bytes', () => {
        expect(
            devidedToBlocksData2.blocks[7].length
        ).toEqual(23);
    });
});