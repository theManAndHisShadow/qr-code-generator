/**
 * Converts decimal into to bynary.
 * @param number target
 * @param bit NB! bit size of result value
 * @returns 
 */
export function decimalToBinary(number: number, bit: number){
    return number.toString(2).padStart(bit, "0");
}