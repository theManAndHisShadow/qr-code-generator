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



/**
 * Returns new array with all combinations from origin array items.
 * @param originArray 
 * @returns 
 */
export function getAllArrayCombinations(originArray: number[]){
    let n = originArray.length;

    let combinationsArray = [];

    for(let i = 0; i <= n; i++){
       for( let j = 0; j <= n; j++){
        if(originArray[i] && originArray[j]) combinationsArray.push([originArray[i], originArray[j]]);
       }
    }

    return combinationsArray;
}



/**
 * Removes all restricted symbols.
 * @param inputText 
 * @param toUpperCase make all letter same (upper) case. Optional argument, by default true.
 * @returns sanitized string
 */
export function sanitizeInput(inputText: string, toUpperCase?: boolean){
    if(toUpperCase === undefined) toUpperCase = true;

    let sanitized = inputText.replace(/([^a-zA-Z0-9$%*+-./:\s]|\,)+/g, '');
   
    if(toUpperCase === true) {
        let atUpperCase: Array<string>;

        atUpperCase = sanitized.split('');
    
        // unify all input data letter case
        atUpperCase = atUpperCase.map(letter => {
            return letter.toUpperCase();
        });
    
        sanitized = atUpperCase.join('');
    }

    return sanitized;
}