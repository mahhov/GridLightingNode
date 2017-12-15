let lightFunctionInput;
let ctx;

let canvasWidth = 950, canvasHeight = 950;
let width = 50, height = 50;
let rectWidth = canvasWidth / width, rectHeight = canvasHeight / height;

let rect, startCoord;
let light;

let mouseDown;
let empty = 0, wall = 1, start = 2;
let pathNode = 4, graphColor = 5;
let draw = empty;
                // emtpy            wall             start          path        graph
                // #eee             #888             #33d           #050        #099
let drawColors = [[238, 238, 238], [136, 136, 136], [51, 51, 221], [0, 85, 0], [0, 153, 153]];
let endpointOverlay = true, graphOverlay = true, pathOverlay = true;

let initCanvas = () => {
    lightFunctionInput = document.getElementById('lightFunctionInput');
    lightFunctionInput.value = lightingFunction.toString();

    let canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    update();
};

let initRectRand = (density) => {
    rect = [];
    _.times(width, () => {
        let column = [];
        rect.push(column);
        _.times(height, () => {
            column.push(randBoolean(density) ? wall : empty);
        });
    });

    startCoord = {
        x: randInt(0, width),
        y: randInt(0, height)
    };
    setRect(startCoord, start);
};

initRectHouse = () => {
    let hg = houseGenerator(width, height);
    hg.generate();

    let walls = hg.getWalls();
    rect = _.map(walls, (column) => {
        return _.map(column, (wall) => {
            return wall ? 1 : 0;
        });
    });

    startCoord = hg.getSpawn(0);
    rect[startCoord.x][startCoord.y] = start;
};

let init = () => {
    initRectHouse(0);
    window.onload = initCanvas;
};

let update = () => {
    if (startCoord)
        light = lightingMain(rect, startCoord);
    if (light)
        refreshCanvas();
};

let refreshCanvas = () => {
    // draw map
    drawCanvasClear();
    _.each(rect, (column, x) => {
        _.each(column, (cell, y) => {
            let color = drawColors[cell === start ? empty : cell];
            let lcolor = lightColor(color, light[x][y]);
            drawCanvasRect(createRect(x, y), lcolor);
        });
    });

    if (endpointOverlay) {
        drawCanvasRect(createRect(startCoord.x, startCoord.y), drawColors[start], true);
    }
};

let getRect = (coord) => {
    return rect[coord.x][coord.y];
}

let setRect = (coord, value) => {
    if (value === start) {
        if (startCoord)
            rect[startCoord.x][startCoord.y] = empty;
        startCoord = coord;
    } else if (coord === startCoord)
        startCoord = null;

    rect[coord.x][coord.y] = value;
}

let setDraw = (value) => {
    draw = value;
}

let lightColor = (color, light) => {
    return _.map(color, (c) => {return c * light;});
};

let changeLightingFunction = () => {
    setLightingFunction(lightFunctionInput.value);
    update();
};

init();
