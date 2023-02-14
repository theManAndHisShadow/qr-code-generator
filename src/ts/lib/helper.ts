/**
 * Converts decimal into to bynary.
 * @param number target
 * @param bit NB! bit size of result value
 * @returns 
 */
export function decimalToBinary(number: number, bit: number){
    return number.toString(2).padStart(bit, "0");
}



/**
 * Returns rotated rectangular matrix.
 * @param targetArray array to transpose
 * @returns 
 */
function rectangularTranspose(targetArray: any[][]) {
    // find max 
    const maxLen = [...targetArray].sort((a, b) => { return b.length - a.length })[0].length;
    const result = Array.from({ length: maxLen }, (item, i) => targetArray.map(col => col[i]));

    return result
}



/**
 * Returns flatted array by vertical direction.
 * @param array 
 * @returns 
 */
export function verticalFlatten(array:any[][]){
    let flatted:any[] = [];
    let transposed = rectangularTranspose([...array]);
    flatted = transposed.flat(1).filter(item => item !== undefined && item.length > 0);

    return flatted;
}