import {decimalToBinary, sanitizeInput} from '../helper'

/**
 * Returns code of single letter.
 * @param letter target letter
 * @returns number code (0-44)
 */
function getLetterCode(letter: string){
    interface Dictionary<Type> {
        [key: string]: Type;
     }

    const codes: Dictionary<number> = {
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "A": 10,
        "B": 11,
        "C": 12,
        "D": 13,
        "E": 14,
        "F": 15,
        "G": 16,
        "H": 17,
        "I": 18,
        "J": 19,
        "K": 20,
        "L": 21,
        "M": 22,
        "N": 23,
        "O": 24,
        "P": 25,
        "Q": 26,
        "R": 27,
        "S": 28,
        "T": 29,
        "U": 30,
        "V": 31,
        "W": 32,
        "X": 33,
        "Y": 34,
        "Z": 35,
        " ": 36,
        "$": 37,
        "%": 38,
        "*": 39,
        "+": 40,
        "-": 41,
        ".": 42,
        "/": 43,
        ":": 44
    };

    return codes[letter];
}



/**
 * Groups letters at string to pairs.
 * @param string target
 * @returns 
 */
export function groupLettersByTwo(string: string){
    return string.match(/.{1,2}/g);
}



/**
 * Convert all pair of letters to pair of codes.
 * @param groups 
 * @returns 
 */
export function convertAllItemsToCodes(groups: string[]){
    return groups.map(group => {
        return group.length < 2 
            ? [getLetterCode(group[0])] 
            : [getLetterCode(group[0]), getLetterCode(group[1])];
    });
}



/**
 * Turns pair of letters to binary value.
 * @param pairs 
 * @returns 
 */
function pairsToBinary(pairs: number[][]){
    let binaries:string[] = pairs.map(pair => {
        return pair.length < 2
            ? decimalToBinary(pair[0], 6)
            : decimalToBinary(pair[0] * 45 + pair[1], 11)
    });

    return binaries;
}



/**
 * Encode given string to binary line value.
 * @param string target
 * @returns binary value (string)
 */
export function encodeStringToBinaryBytes(string: string){
    let sanitized = sanitizeInput(string);
    let grouped = groupLettersByTwo(sanitized);
    let converted = convertAllItemsToCodes(grouped!);
    let binaries = pairsToBinary(converted);

    return binaries.join('');
}
