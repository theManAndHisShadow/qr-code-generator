function fillBackground(context: CanvasRenderingContext2D){
    context.fillStyle = 'white';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

export function drawQR(canvas: HTMLCanvasElement, data: any){
    let context = canvas.getContext('2d');
    fillBackground(context);
}