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

    //JS does not have 64 bit integers :sob: - a 64 bit float is good enough for this problem
    let visiteds = new Float64Array(w*h);

    let q = new Heap((a, b) => a.cost-b.cost);
    q.push({cost: 0, position: [0, 0], steps: 0, direction: 0});
    q.push({cost: 0, position: [0, 0], steps: 0, direction: 2});

    while(q.length) {
        let {cost, position, steps, direction} = q.pop();
        let [i, j] = position;

        if(i === (h-1) && j === (w-1) && steps >= 4) {
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

                if(steps < 4) {
                    continue;
                }
            } else {
                newSteps = steps + 1;
                if(newSteps > 10) {
                    continue;
                }
            }
            let newCost = cost + lines[newI][newJ];

            let dpIdx = newI * w + newJ;
            let pow = (((newSteps-1))*4) + newDirection;
            let dpMask = 2**pow;
            if(bitwiseAnd64Bit(visiteds[dpIdx], dpMask) !== 0) {
                continue;
            }

            q.push({cost: newCost, position: [newI, newJ], steps: newSteps, direction: newDirection});
            visiteds[dpIdx] += dpMask;
        }
    }
}

//shamelessly stolen from stackoverflow
function bitwiseAnd64Bit(a, b) {
    var hi = 0x80000000;
    var low = 0x7fffffff;
    var hi1 = ~~(a / hi);
    var hi2 = ~~(b / hi);
    var low1 = a & low;
    var low2 = b & low;
    var h = hi1 & hi2;
    var l = low1 & low2;
    return h*hi + l;
}


console.time()
console.log(doIt(input))
console.timeEnd()
