function fillBackground(context: CanvasRenderingContext2D){
    context.fillStyle = 'white';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

/**
 * Returns aligment anchor positions.
 * @param versionNumber 
 * @returns 
 */
export function getAlignmentAnchorPos(versionNumber:number){
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
    let aligmenAnchorPos = getAlignmentAnchorPos(versionNumber);

    // + 8: 4 modules width for each side - white space around qr code!
    return (aligmenAnchorPos[0] === 0
        ? 21 : aligmenAnchorPos[aligmenAnchorPos.length - 1] + 7) + 8;
}



/**
 * Draw single module (1x1).
 * @param context canvas contexn
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



export function drawQR(canvas: HTMLCanvasElement, data: any){
    let context = canvas.getContext('2d');
    let moduleSize = Math.round(canvas.width / getModulesAmount(data.version.number));
    fillBackground(context);
    drawFinderPatterns(context,moduleSize);
}