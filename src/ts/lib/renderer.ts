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



export function getVersionData(versionNumber: number){
    const data = [
        "0","0","0","0","0","0",
        "000010011110100110","010001011100111000",
        "110111011000000100","101001111110000000","001111111010111100",
        "001101100100011010","101011100000100110","110101000110100010","010011000010011110",
        "011100010001011100","111010010101100000","100100110011100100","000010110111011000","000000101001111110",
        "100110101101000010","111000001011000110","011110001111111010","001101001101100100","101011001001011000","110101101111011100",
        "010011101011100000","010001110101000110","110111110001111010","101001010111111110","001111010011000010","101000011000101101","001110011100010001",
        "010000111010010101","110110111110101001","110100100000001111","010010100100110011","001100000010110111","101010000110001011","111001000100010101"
    ]

    return data[versionNumber - 1];
}



export function getCorrectionMaskData(correction: string, mask?: number){
    interface DataCollection {
        [key: string]: Array<string>
    }

    mask = mask || 1;

    const data:DataCollection = {
        L:[
            "111011111000100","111001011110011","111110110101010","111100010011101",
            "110011000101111","110001100011000","110110001000001","110100101110110"
        ],

        M:[
            "101010000010010","101000100100101","101111001111100","101101101001011",
            "100010111111001","100000011001110","100111110010111","100101010100000"
        ],

        Q:[
            "011010101011111","011000001101000","011111100110001","011101000000110",
            "010010010110100","010000110000011","010111011011010","010101111101101",
        ],

        H:[
            "001011010001001","001001110111110","001110011100111","001100111010000",
            "000011101100010","000001001010101","000110100001100","000100000111011"
        ],
    }

    return data[correction][mask - 1];
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



/**
 * Draws version number data blocks.
 * @param context canvas 2d context
 * @param size of module
 * @param version  of qr
 */
function drawVersionCodes(context: CanvasRenderingContext2D, size: number, version: number){
    let versionData = getVersionData(version);
    let rect = getBoundingRect(context, size);
    let codeStartPos = [rect.leftBottom[0], rect.leftBottom[1] - 11*size];

    if(versionData !== "0"){
        let bits = versionData.match(/.{1,6}/g);

        for(let i = 0; i <= bits.length; i++){
            if(bits[i]){
                for(let j = 0; j < bits[i].length; j++){
                    let color = bits[i][j] == "1" ? "black" : "white";
        
                    drawModule(context, codeStartPos[0] + j*size, codeStartPos[1] + i*size, size, color);
                    // Technically we can just change x ant y to draw other version code marker!
                    drawModule(context, codeStartPos[1] + i*size, codeStartPos[0] + j*size,  size, color);
                }
            }
        }
    }
}



/**
 * Draws correction level info and mask code to qr code service data region.
 * @param context canvas 2d context
 * @param size of module
 * @param correction level
 * @param mask qr code encoding data mask
 */
function drawCorrectionLevelAndMaskDataCodes(context: CanvasRenderingContext2D, size: number, correction: string, mask?: number){
    let rect = getBoundingRect(context, size);

    let correctionAndMaskData = getCorrectionMaskData(correction, mask);
    let dataArray = [correctionAndMaskData.slice(0, 7), correctionAndMaskData.slice(7, 15).split('').reverse().join('')];
    
    let bottomLeftStartPos = [rect.leftBottom[0] + 8*size, rect.leftBottom[1] - 1*size];
    let topLeftHorizontalStartPos  = [rect.leftTop[0] , rect.leftTop[1] + 8*size];
    let topLeftVericalStartPos = [rect.leftTop[0] + 8*size, rect.leftTop[1]];
    let topRightStartPos = [rect.rightTop[0] - 1*size, rect.rightTop[1] + 8*size];
    
    for(let i = 0; i < dataArray[0].length; i++){
        drawModule(context, bottomLeftStartPos[0], bottomLeftStartPos[1] - i*size, size, dataArray[0][i] === "1" ? "black" : "white");
        drawModule(context, topLeftHorizontalStartPos[0] + (i == 6 ? 7 : i)*size, topLeftHorizontalStartPos[1], size, dataArray[0][i] === "1" ? "black" : "white");
    }

    for(let j = 0; j < dataArray[1].length; j++) {
        drawModule(context, topRightStartPos[0] - j*size, topRightStartPos[1], size, dataArray[1][j] === "1" ? "black" : "white");
        drawModule(context, topLeftVericalStartPos[0], topLeftVericalStartPos[1] + (j == 7 ? 8 : j)*size, size, dataArray[1][j] === "1" ? "black" : "white");
    }
    
    drawModule(context, bottomLeftStartPos[0], bottomLeftStartPos[1] - 7*size, size, 'black');
}



/**
 * Render all bits from stream to qr code encoding region.
 * @param context canvas 2d context
 * @param size of module
 * @param stream of data
 */
function renderStream(context: CanvasRenderingContext2D, size: number, stream: number){
    let rect = getBoundingRect(context, size);

    // width and height in modules
    let width = Math.floor(context.canvas.width / size);
    let height = Math.floor(context.canvas.height / size);

    // d here - direction of data (bottom up or top down)
    // all encoding region groups to columns by 2 modules
    for(let i = 0, d = 0; i <= width; i++, d++){
        // only 4 variants: 0, 1, 2, 3
        // 0, 1 - bottom up
        // 2, 3 - top down
        // if d > 3 (3 - max value) - reset d to zero
        if (d > 3) d = 0;
        
        for(let j = 0; j <= height; j++){
            // d cant be lower than zero!
            if (d < 0) d = 0;

            // temp
            let color = d <= 1 ? 'red' : 'blue';
            
            let x = rect.rightBottom[0] - size - i*size;
            let y = rect.rightBottom[1] - size - j*size;

            // region excluding:
            // is module inside bounding rect
            let insideRect = (x >= rect.leftTop[0] && x <= rect.rightTop[0]) && (y >= rect.leftTop[1]);

            // is module inside finder patterns
            let rightCorner = (x >= rect.rightTop[0] - size*9) && (y <= rect.rightTop[1] + size*9);
            let leftTopCorner = (x <= rect.leftTop[0] + size*8) && (y <= rect.leftTop[1] + size*9);
            let leftBottomCorner = (x <= rect.leftBottom[0] + size*8) && (y >= rect.leftBottom[1] - size*9);

            // is module inside sunc patterns
            let isVericalSyncPattern = i == width - 9 - 6;
            let isHorizontalSyncPattern = j == height - 9 - 6;

            // region exluding
            let isNotOnPatterns = 
                !rightCorner && !leftTopCorner && !leftBottomCorner && !isVericalSyncPattern 
                && !isHorizontalSyncPattern;

            // if vertical sync line - move all left columns to left by 1 module 
            if(isVericalSyncPattern === true){
                d = 1;
            }
                
            // draw module only result encoding region
            if(insideRect && isNotOnPatterns){
                drawModule(context, x, y, size, color);
            }
        }
    }
}



export function drawQR(canvas: HTMLCanvasElement, data: any){
    let context = canvas.getContext('2d');
    let modulesAmount = getModulesAmount(data.version.number);
    let moduleSize = canvas.width / modulesAmount;

    fillBackground(context);
    renderStream(context, moduleSize, data.stream);
    drawFinderPatterns(context, moduleSize);
    drawAligmentPatterns(context, moduleSize, data.version.number);
    drawVersionCodes(context, moduleSize, data.version.number);
    drawCorrectionLevelAndMaskDataCodes(context, moduleSize, data.correction)
    drawTimingPatterns(context, moduleSize);
}