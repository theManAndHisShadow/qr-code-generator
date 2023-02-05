import {getOptimalQRCodeVersion, choseVersion} from "../src/ts/serviceData";

let testValue1 = 15;
let testBitsArray = [10, 17, 19];

describe('choseVersion() returns the object with closest version that can contain a bitstream of the given size', () => {
    test(`${testValue1} bits can contains at version 2 "`, ()=> {
        expect(choseVersion(testBitsArray, testValue1).number).toBe(2);
      });
});



let testValue2 = 145;
let testValue3 = 266;
let testValue4 = 670;

describe('getOptimalQRCodeVersion() returns optimal code version', () => {
    test(`${testValue2} bits with correction L can contains at version 1 "`, ()=> {
        expect(getOptimalQRCodeVersion(testValue2, "L").number).toBe(1);
    });

    test(`${testValue3} bits with correction M can contains at version 3 "`, ()=> {
        expect(getOptimalQRCodeVersion(testValue3, "M").number).toBe(3);
    });

    test(`${testValue4} bits with correction H can contains at version 8 "`, ()=> {
        expect(getOptimalQRCodeVersion(testValue4, "H").number).toBe(8);
    });
});
