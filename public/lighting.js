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

// let lightingMain = (map, source) => {
//     let width = map.length;
//     let height = map[0].length;
//     let graph;
//     let openCount;
//     let sourceNode;
//
//     let createGraphNodes = () => {
//         graph = [];
//         _.each(map, (column, x) => {
//             _.each(column, (cell, y) => {
//                 let current = makeCoordinate(x, y);
//                 let upRight = modifyCoordinate(current, 1, -1);
//                 let upLeft = modifyCoordinate(current, -1, -1);
//                 let downRight = modifyCoordinate(current, 1, 1);
//                 let downLeft = modifyCoordinate(current, -1, 1);
//                 let up = modifyCoordinate(current, 0, -1);
//                 let down = modifyCoordinate(current, 0, 1);
//                 let left = modifyCoordinate(current, -1, 0);
//                 let right = modifyCoordinate(current, 1, 0);
//
//                 let touchCurrent = map[current.x][current.y] === 1;
//                 let touchUp = !inBounds(up) || map[up.x][up.y] === 1;
//                 let touchDown = !inBounds(down) || map[down.x][down.y] === 1;
//                 let touchLeft = !inBounds(left) || map[left.x][left.y] === 1;
//                 let touchRight = !inBounds(right) || map[right.x][right.y] === 1;
//                 let touchUpRight = !inBounds(upRight) || map[upRight.x][upRight.y] === 1;
//                 let touchUpLeft = !inBounds(upLeft) || map[upLeft.x][upLeft.y] === 1;
//                 let touchDownRight = !inBounds(downRight) || map[downRight.x][downRight.y] === 1;
//                 let touchDownLeft = !inBounds(downLeft) || map[downLeft.x][downLeft.y] === 1;
//
//                 let specialUpRight = (touchUpRight && !touchUp && !touchRight);
//                 let specialUpLeft = (touchUpLeft && !touchUp && !touchLeft);
//                 let specialDownRight = (touchDownRight && !touchDown && !touchRight);
//                 let specialDownLeft = (touchDownLeft && !touchDown && !touchLeft);
//                 let special = specialUpRight || specialUpLeft || specialDownRight || specialDownLeft;
//
//                 if (!touchCurrent && special)
//                     addNode(current);
//             });
//         });
//     };
//
//     let createSourceNode = () => {
//         sourcNode
//     };
//
//     let createGraphEdges = () => {
//         _.each(graph, (nodeA, i) => {
//             _.times(i, (j) => {
//                 let nodeB = graph[j];
//                 if (!intersects(map, nodeA.coord, nodeB.coord))
//                     addEdge(nodeA, nodeB);
//             });
//         });
//     };
//
//     let addNode = (coord) => {
//         let node = {coord: coord, connected: []};
//         graph.push(node);
//         return node;
//     };
//
//     let addEdge = (nodeA, nodeB) => {
//         //console.log('edge added');
//         let dx = nodeA.coord.x - nodeB.coord.x;
//         let dy = nodeA.coord.y - nodeB.coord.y;
//         let distance = Math.sqrt(dx * dx + dy * dy);
//         nodeA.connected.push({neighbor: nodeB, distance: distance});
//         nodeB.connected.push({neighbor: nodeA, distance: distance});
//     };
//
//     let inBounds = (coord) => {
//         return coord.x >= 0 && coord.x < width && coord.y >= 0 && coord.y < height;
//     };
//
//     let prepareAStar = () => {
//         _.each(graph, node => {
//             node.g = Infinity;
//             node.f = Infinity;
//             node.open = false;
//             node.closed = false;
//         });
//
//         start.g = 0;
//         start.f = start.h = getH(start.coord);
//         start.open = true;
//         openCount = 1
//     };
//
//     let aStar = () => {
//         while (openCount > 0) {
//             current = getNodeWithSmallestF();
//
//             if (current === end)
//                 return reconstructPath(current);
//
//             openCount--;
//             current.open = false;
//             current.closed = true;
//
//             _.each(current.connected, connection => {
//                 if (connection.neighbor.closed)
//                     return;
//
//                 if (!connection.neighbor.open) {
//                     openCount++;
//                     connection.neighbor.open = true;
//                 }
//
//                 g = current.g + connection.distance;
//                 if (g >= connection.neighbor.g)
//                     return;
//
//                 connection.neighbor.cameFrom = current;
//                 connection.neighbor.g = g;
//                 connection.neighbor.f = g + getH(connection.neighbor.coord);
//             });
//         }
//
//         return null;
//     };
//
//     let getNodeWithSmallestF = () => {
//         let current = null;
//         _.each(graph, (node) => {
//             if (node.open && (!current || node.f < current.f))
//                 current = node;
//         });
//         return current;
//     };
//
//     let getH = (coord) => {
//         let dx = coord.x - end.coord.x;
//         let dy = coord.y - end.coord.y;
//         return Math.sqrt(dx * dx + dy * dy);
//     };
//
//     let reconstructPath = (current) => {
//         let totalPath = [current];
//         while (current.cameFrom) {
//             current = current.cameFrom;
//             totalPath.push(current);
//         }
//         return totalPath;
//     };
//
//     createGraphNodes();
//     createGraphEdges();
//     prepareAStar();
//     return {
//         path: _.pluck(aStar(), 'coord'),
//         graph: graph
//     };
// };
