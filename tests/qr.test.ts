/**
 * @jest-environment jsdom
 */

import { qr } from "../src/ts/qr-core/qr";

let text1 = 'Hello world!';
let text2 = 'Other text';


let qrCode1 = qr({
    text: text1,
});


let input1 = document.createElement('input');
input1.value = text2;

let qrCode2 = qr({
    text: text1,
    textOrigin: input1,
});


let input2 = document.createElement('input');
input2.value = text2;

let qrCode3 = qr({
    textOrigin: input2,
    text: text1,
});


describe('qr() function returns {canvas: HTMLCanvasElement, data: {...originalData, stream, and etc} }', () => {
    test('qr({text: text1}) must use text param', () => {
        expect(qrCode1.data.originalData).toBe(text1);
    });

    test('qr({text: text1, textOrigin: input1}) must use textOrigin param', () => {
        expect(qrCode2.data.originalData).toBe(text2);
    });

    test('qr({text: text1, textOrigin: input2}) must use textOrigin param', () => {
        expect(qrCode3.data.originalData).toBe(text2);
    });


    test('qr() without text sources must return error', () => {
        expect(() => {
            qr({
                correction: 'M',
            });
        }).toThrow('qr(text?: string, textOrigin?:HTMLInputElement...): at least one text source must be passed to function');
    });
});
