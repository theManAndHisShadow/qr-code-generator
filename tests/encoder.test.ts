import {
  convertAllItemsToCodes, 
  groupLettersByTwo, 
  sanitizeInput,  
  encodeStringToBinaryBytes
} from '../src/ts/encoder';

import {decimalToBinary} from '../src/ts/helper'


let targetString1 = "Hello World!";
let targetString2 = "ab!@# $%^.:/ /**& ---*()_+!";

describe('sanitizeInput() allows only "a-zA-Z0-9$%*+-./:" symbols', ()=> {
  test(`${targetString1} turns into "HELLO WORLD"`, ()=> {
    expect(sanitizeInput(targetString1)).toBe('HELLO WORLD');
  });

  test(`${targetString2} turns into "AB $%.:/ /** ---*+"`, ()=> {
    expect(sanitizeInput(targetString2)).toBe('AB $%.:/ /** ---*+');
  });
});



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