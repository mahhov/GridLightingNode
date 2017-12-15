let lightingMain = (map, source) => {
    let light = [];

    let distance = (x, y) => {
        let dx = (x - source.x);
        let dy = (y - source.y)
        return Math.sqrt(dx * dx + dy * dy);
    };

    let range = (light) => {
        let min = .2, max = 1;
        if (light < min)
            return min;
        else if (light > max)
            return max;
        return light;
    };

    let hasView = (x, y) => {
        return !intersects(map, {x: x, y: y}, source);
    };

    _.each(map, (column, x) => {
        let lightColumn = [];
        light.push(lightColumn);
        _.each(column, (cell, y) => {
            if (hasView(x,y)) {
                let d = distance(x, y);
                let value = lightingFunction(d);
                lightColumn.push(range(value));
            } else
                lightColumn.push(range(0));
        });
    });

    return light;
};

var lightingFunction = (d) => {
    return 1 - d * .2
};

var setLightingFunction = (functionString) => {
    try {
        lightingFunction = eval(functionString);
    } catch (err) {

    }
}
