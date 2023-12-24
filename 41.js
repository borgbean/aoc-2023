let input = ``;

let directions = [
    [0,1],
    [0,-1],
    [-1,0],
    [1,0]
];

/**
 * 
 * @param {string} rawInput 
 * @returns 
 */
function doIt(lines, start, targetSteps, allowGrowth) {

    let w = lines[0].length;
    let h = lines.length;

    let seen = new Uint8Array(w*h);
    let seenCount = 1;


    seen[start[0]*w + start[1]] = 1;

    let steps = 0;
    let q = [];
    let q2 = [start];

    
    let odds = 0;
    let evens = 0;

    while(q2.length || q.length) {

        if(!q.length) {
            [q, q2] = [q2, q];
            curSteps = 0;
            seenCount += q.length;
            if((steps & 1) === 1) {
                evens += q.length;
            } else {
                odds += q.length;
            }
            
            if(steps >= targetSteps) {
                break;
            }
            ++steps;
        }

        let [i, j] = q.pop();

        for(let [iOff, jOff] of directions) {
            let newI = i + iOff;
            let newJ = j + jOff;

            if(!allowGrowth) {
                if(newI < 0 || newJ < 0 || newI >= h || newJ >= w) {
                    continue;
                }
            }

            let dpIdx = newI*w + newJ;
            if(seen[dpIdx]) {
                continue;
            }

            
            if(lines.at(newI % h).at(newJ % w) === '#') {
                continue;
            }


            seen[dpIdx] = 1;
            q2.push([newI, newJ]);
        }


    }
    if((targetSteps&1) === 1) {
        return [evens];
    }
    return [odds];
}


let start = input.indexOf('S');
let lines = input.split('\n');

let w = lines[0].length;
let h = lines.length;

let startCoords = [Math.floor(start/(w+1)),  start % (w+1)];


module.exports = {doIt: (target, allowGrowth, start=startCoords) => doIt(lines, start, target, allowGrowth)[0]};

console.log(module.exports.doIt(64, false))