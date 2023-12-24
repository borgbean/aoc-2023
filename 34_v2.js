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

const RENDER_PATH = true;


/**
 * 
 * @param {string} rawInput 
 * @returns 
 */
function doIt(rawInput) {
    let lines = rawInput.split('\n').map(x => x.split('').map(Number));

    let w = lines[0].length;
    let h = lines.length;

    //JS does not have 64 bit integers :sob: - a 64 bit float is good enough for this problem
    // let visiteds = new Float64Array(w*h);
    let MAX_STEPS = 10;
    let visiteds = new Uint8Array(MAX_STEPS*allowedDirections.length*w*h);
    let visiteds1Width = MAX_STEPS * allowedDirections.length;
    let visiteds2Width = allowedDirections.length;


    let q = new Heap((a, b) => a.heur-b.heur);
    q.push({heur: 0, cost: 0, position: [0, 0], steps: 0, direction: 0, trail: []});
    q.push({heur: 0, cost: 0, position: [0, 0], steps: 0, direction: 2, trail: []});

    let recycle = [];

    while(q.length) {
        let obj = q.pop();
        let {cost, position, steps, direction, trail} = obj;
        let [i, j] = position;

        if(i === (h-1) && j === (w-1) && steps >= 4) {
            if(RENDER_PATH) {
                for(let [markI, markJ] of trail) {
                    lines[markI][markJ] = '\u001b[1;41m' + lines[markI][markJ] + '\u001b[1;00m';
                }
                for(let line of lines) {
                    console.log(line.join(''))
                }
            }

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
            let iDist = (h-1-newI);
            let jDist = (w-1-newJ);
            let newCostHeur = cost + lines[newI][newJ] + (iDist + jDist);
            if(iDist > 0 && neighborOffset[0] < 1) {
                newCostHeur += 1;
            }
            if(jDist > 0 && neighborOffset[1] < 1) {
                newCostHeur += 1;
            }
            
            let dpIdx = newI * w + newJ;
            let dpVal = (dpIdx*visiteds1Width) + (((newSteps-1))*visiteds2Width) + newDirection;
            if(visiteds[dpVal]) {
                continue;
            }

            let newTrail = null;
            if(RENDER_PATH) {
                newTrail = trail.slice();
                newTrail.push([newI, newJ]);
            }

            if(obj === null && recycle.length) {
                obj = recycle.pop();
            }
            if(obj !== null) {
                obj.heur = newCostHeur;
                obj.cost = newCost;
                obj.position[0] = newI;
                obj.position[1] = newJ;
                obj.steps = newSteps;
                obj.direction = newDirection;
                obj.trail = newTrail;
                q.push(obj);
                obj = null;
            } else {
                q.push({heur: newCostHeur, cost: newCost, position: [newI, newJ], steps: newSteps, direction: newDirection, trail: newTrail});
            }
            visiteds[dpVal] = 1;
        }
        if(obj !== null && recycle.length < 100) {
            recycle.push(obj);
        }
    }
}


console.time()
console.log(doIt(input))
console.timeEnd()
