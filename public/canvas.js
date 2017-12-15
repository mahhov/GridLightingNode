let drawCanvasClear = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
};

let componentToHex = (c) => {
    if (c < 0)
        c = 0;
    else if (c > 255)
        c = 255;
    else
        c = parseInt(c);
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

let rgbToHex = (rgb) => {
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
};

let drawCanvasRect = (rect, color) => {
    color = rgbToHex(color);
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
};

let drawCanvasLine = (line, color, width) => {
    color = rgbToHex(color);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
};
