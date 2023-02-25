import { getAllArrayCombinations, nestedArrayIndexOf } from "./helper";



/**
 * Fills background with selected color
 * @param context canvas 2d context
 * @param color fill color. By default - white
 */
function fillBackground(context: CanvasRenderingContext2D, color?: string){
    context.fillStyle = color || 'white';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}



/**
 * Returns aligment anchor positions.
 * @param versionNumber 
 * @returns 
 */
export function getAligmentPatternsPos(versionNumber:number){
    const data = [
        [0], [18], [22], [26], [30], [34], [6, 22, 38], [6, 24, 42],
        [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62],
        [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82],
        [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170],
    ];

    return data[versionNumber - 1];
}



/**
 * Returns qr code module size.
 * @param versionNumber 
 * @returns 
 */
export function getModulesAmount(versionNumber: number){
    let aligmenAnchorPos = getAligmentPatternsPos(versionNumber);

    // + 8: 4 modules width for each side - white space around qr code!
    return (aligmenAnchorPos[0] === 0
        ? 21 : aligmenAnchorPos[aligmenAnchorPos.length - 1] + 7) + 8;
}



/**
 * Draw single module (1x1).
 * @param context canvas context
 * @param x coord
 * @param y coord
 * @param size of module
 * @param color of module (dafault value - black)
 */
function drawModule(context: CanvasRenderingContext2D, x: number, y: number, size: number, color?: string) {
    color = color || 'black';

    context.fillStyle = color;
    context.fillRect(x, y, size, size);
}



/**
 * Returns bounding rectangle points.
 * @param context canvas context
 * @param size of module
 * @returns 
 */
function getBoundingRect(context: CanvasRenderingContext2D, size: number){
    let w = context.canvas.width;
    let h = context.canvas.height;
    let offset = size * 4;

    return {
        leftTop: [0 + offset, 0 + offset],
        rightTop: [w - offset, 0 + offset],
        leftBottom: [0 + offset, h - offset],
        rightBottom: [w - offset, h - offset],
    };
}



/**
 * Draws three finder patterns.
 * @param context canvas 2d context
 * @param size of module
 */
function drawFinderPatterns(context: CanvasRenderingContext2D, size: number){
    for(let i = 0; i <= 6; i++){
        for(let j = 0; j <= 6; j++) {
            let isEdge = ((j === 0 || i === 0) || (j === 6 || i === 6));
            let isNotWhiteLines = ((i !== 1 && i !== 5) && (j !== 1 && j !== 5));
            let rect = getBoundingRect(context, size);

            if(isEdge || isNotWhiteLines){
                // top left pattern
                drawModule(
                    context, 
                    rect.leftTop[0] + i*size, 
                    rect.leftTop[1] + j*size, 
                    size
                );

                // top right pattern
                drawModule(
                    context, 
                    rect.rightTop[0] - (i * size) - size, 
                    rect.rightTop[1] + j*size, 
                    size
                );

                // left bottom pattern
                drawModule(
                    context, 
                    rect.leftBottom[0] + i*size, 
                    rect.leftBottom[1] - j*size - size, 
                    size
                );
            }
        } 
    }
}



/**
 * Draws timing pattern.
 * @param context canvas 2d context
 * @param size of module
 */
function drawTimingPatterns(context: CanvasRenderingContext2D, size: number){
    let rect = getBoundingRect(context, size);
    let verticalLineStartPos = [rect.leftTop[0] + size*6, rect.leftTop[1] + size*6];
    let verticalLineEndPos = [rect.leftBottom[0] + size*6, rect.leftBottom[1] - size*7];
    let verticalDistance = verticalLineEndPos[1] - verticalLineStartPos[1];


    for(let i = 0; i <= (verticalDistance / size); i++) {
        if(i % 2 === 0) {
            drawModule(context, verticalLineEndPos[0], verticalLineStartPos[1] + i*size, size); 
            // Technically we can just change x ant y to get horizontal timing line!
            drawModule(context, verticalLineStartPos[1] + i*size, verticalLineEndPos[0], size); 
        }
    }
}



/**
 * Draws alignment patterns (starting 7th version).
 * @param context canvas 2d context
 * @param size of module
 * @param version of qr
 */
function drawAligmentPatterns(context: CanvasRenderingContext2D, size: number, version: number){
    let rect = getBoundingRect(context, size);
    let aligmentPatternsPos = getAllArrayCombinations(getAligmentPatternsPos(version));

    // Starting 7th version qr shoud contain aligment patterns.
    if(version > 6) {
        // Remove all alignment patterns near finder patterns
        let potentialTargets = aligmentPatternsPos.filter(item => item[0] == 6);
        let lastItem = potentialTargets[potentialTargets.length - 1];
        let reversedLastItem = lastItem.reverse();

        let firstTargetIndex = nestedArrayIndexOf(aligmentPatternsPos, potentialTargets[0]);
        aligmentPatternsPos.splice(firstTargetIndex, 1);

        let secondTargetIndex = nestedArrayIndexOf(aligmentPatternsPos, lastItem);
        aligmentPatternsPos.splice(secondTargetIndex, 1);
        
        let thirdTargetIndex = nestedArrayIndexOf(aligmentPatternsPos, reversedLastItem);
        aligmentPatternsPos.splice(thirdTargetIndex, 1);
    }

    aligmentPatternsPos.forEach((position, p) => {
        // centrize
        position = [position[0] - 2, position[1] - 2];

        for(let i = 0; i <= 4; i++){
            for(let j = 0; j <= 4; j++) {
                let isEdge = ((j === 0 || i === 0) || (j === 4 || i === 4));
                let isNotWhiteLines = ((i !== 1 && i !== 3) && (j !== 1 && j !== 3));
    
                if(isEdge || isNotWhiteLines){
                    // top left pattern
                    drawModule(
                        context, 
                        rect.leftTop[0] + (position[0]*size) + i*size, 
                        rect.leftTop[1] + (position[1]*size) + j*size, 
                        size
                    );
                }
            } 
        }
    });
}



export function drawQR(canvas: HTMLCanvasElement, data: any){
    let context = canvas.getContext('2d');
    let modulesAmount = getModulesAmount(data.version.number);
    let moduleSize = canvas.width / modulesAmount;

    fillBackground(context);
    drawFinderPatterns(context, moduleSize);
    drawTimingPatterns(context, moduleSize);
    drawAligmentPatterns(context, moduleSize, data.version.number);
}