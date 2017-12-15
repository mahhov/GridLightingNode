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
        return intersects(map, {x: x, y: y}, source);
    };

    _.each(map, (column, x) => {
        let lightColumn = [];
        light.push(lightColumn);
        _.each(column, (cell, y) => {
            if (hasView(x,y))
                lightColumn.push(range(0));
            else {
                let d = distance(x, y);
                lightColumn.push(range(1 / Math.sqrt(d)));
            }
        });
    });

    return light;
};
