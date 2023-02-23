import {decimalToBinary, sanitizeInput} from '../src/ts/lib/helper';

import {
  convertAllItemsToCodes, 
  groupLettersByTwo, 
  encodeStringToBinaryBytes
} from '../src/ts/lib/encoder';



let targetString1 = "Hello World!";
let targetString2 = "ab!@# $%^.:/ /**& ---*()_+!";

let sanitazedInput1 = sanitizeInput(targetString1);
let sanitazedInput2 = sanitizeInput(targetString2);

describe('groupLettersByTwo() - groups letter by 2 chars', () => {
  test(`${sanitazedInput1} grouped is ["HE", "LL", "O ", "WO", "RL", "D"]`, () => {
    expect(groupLettersByTwo(sanitazedInput1)).toEqual(["HE", "LL", "O ", "WO", "RL", "D"]);
  });
  
  test(`${sanitazedInput2} grouped is ["AB", " $", "%.", ":/", " /", "**", " -", "--", "*+"]`, () => {
    expect(groupLettersByTwo(sanitazedInput2)).toEqual(["AB", " $", "%.", ":/", " /", "**", " -", "--", "*+"]);
  });
});



let groupedTarget1 = groupLettersByTwo(sanitazedInput1);

describe('convertAllItemsToCodes() - converts all letters in array to codes', () => {
  test(`${sanitazedInput1} is => [[17, 14], [21, 21], [24, 36], [32, 24], [27, 21], [13]]`, () => {
    expect(convertAllItemsToCodes(groupedTarget1!)).toEqual([[17, 14], [21, 21], [24, 36], [32, 24], [27, 21], [13]]);
  });
});




let targetNum1 = 779;
let targetNum2 = 966;
let targetNum3 = 24;

describe('decimalToBinary() - turn dec num to binary number', () => {
  test(`${targetNum1} is 01100001011`, () => {
    expect(decimalToBinary(targetNum1, 11)).toBe('01100001011');
  });

  test(`${targetNum2} is 01111000110`, () => {
    expect(decimalToBinary(targetNum2, 11)).toBe('01111000110');
  });

  test(`${targetNum3} is 011000`, () => {
    expect(decimalToBinary(targetNum3, 6)).toBe('011000');
  });
});



let encodeTarget1 = 'Hello';

describe('encodeStringToBinaryBytes() - converts string to binary bytes line', () => {
  test(`${encodeTarget1} is => 0110000101101111000110011000`, () => {
    expect(encodeStringToBinaryBytes(encodeTarget1)).toBe('0110000101101111000110011000');
  });
});