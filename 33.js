let Heap = require('heap-js').Heap;

let input = ``;


let neighborOffsets = [
    [0, 1], // dir = 0
    [0, -1], // dir = 1
    [1, 0], // dir = 2
    [-1, 0] // dir = 3
];

let allowedDirections = [
    [0, 3, 2],  // i.e. RIGHT can go RIGHT, UP, DOWN (90 degree turn or no turn)
    [1, 3, 2],
    [2, 0, 1],
    [3, 0, 1]
];

/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    let lines = input.split('\n').map(x => x.split('').map(Number));

    let w = lines[0].length;
    let h = lines.length;

    let visiteds = new Uint32Array(w*h);

    visiteds[0] = 1;

    let q = new Heap((a, b) => a.cost-b.cost);
    q.push({cost: 0, position: [0, 0], steps: 1, direction: 0});
    q.push({cost: 0, position: [0, 0], steps: 1, direction: 2});

    while(q.length) {
        let {cost, position, steps, direction} = q.pop();
        let [i, j] = position;

        if(i === (h-1) && j === (w-1)) {
            return cost;
        }

        for(let newDirection of allowedDirections[direction]) {
            let neighborOffset = neighborOffsets[newDirection];
            let newI = i + neighborOffset[0];
            let newJ = j + neighborOffset[1];

            if(newI < 0 || newI >= h || newJ < 0 || newJ >= w) {
                continue;
            }

            let changedDirection = newDirection !== direction;
            let newSteps;
            if(changedDirection) {
                newSteps = 1;
            } else {
                newSteps = steps + 1;
                if(newSteps > 3) {
                    continue;
                }
            }
            let newCost = cost + lines[newI][newJ];

            let dpIdx = newI * w + newJ;
            let dpMask = 1<< ((((newSteps-1))*4) + newDirection);
            if((visiteds[dpIdx] & dpMask) !== 0) {
                continue;
            }

            q.push({cost: newCost, position: [newI, newJ], steps: newSteps, direction: newDirection});
            visiteds[dpIdx] |= dpMask;

        }

    }
}



console.time()
console.log(doIt(input))
console.timeEnd()
