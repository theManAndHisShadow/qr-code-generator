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

    return aligmenAnchorPos[0] === 0
        ? 21 : aligmenAnchorPos[aligmenAnchorPos.length - 1] + 7;
}

export function drawQR(canvas: HTMLCanvasElement, data: any){
    let context = canvas.getContext('2d');

    fillBackground(context);
}