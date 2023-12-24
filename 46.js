/*
NOTE: VERY slow. Takes about 10-15 seconds. works by memorizing non-branching subpaths,
and modifying the depth first search from part 1 to 'jump ahead'.

Changing the represenation of the input to a weighted graph, and replacing long non-branching
paths with a single higher weight edge would probably be faster (and simpler). But, I did this first!
*/

let input = ``;

let directions = [[0, 1],
                  [0, -1],
                  [1, 0],
                  [-1, 0]];


function doIt(rawInput) {
    let lines = rawInput.split('\n');

    let start = [0, 1];
    let seen = new Uint8Array(lines.length * lines[0].length);
    seen[1] = 1;
    
    let dp = new Map()
    
    /*
    * find any partial paths (runs) which have no branches, and store populate 'dp'
    * with a map of start-end and end-start of those runs (to be used in the real search)
    */
    findRuns(lines, start, seen, dp, [0,0]);
    /*
    * mark the interior points of these paths as 'seen', so that we do not backtrack
    * jumping from the start of a path to the end of a path
    */
    for(let i = 0; i < seen.length; ++i) {
        if(seen[i] !== 2) { seen[i] = 0; }
        else { seen[i] = 1; }
    }

    seen[1] = 1;
    return dfs(lines, start, seen, dp);
}

function findRuns(lines, start, seen, dp, beforeStart) {

    let path = [start];

    while(true) {
    
        let options = [];
        let directionsToCheck = directions;

        let pathEnded = false;
    
        for(let [iOff, jOff] of directionsToCheck) {
            let i = start[0] + iOff;
            let j = start[1] + jOff;

            if(i < 0 || j < 0 || i >= lines.length || j >= lines[0].length) {
                continue;
            }
            if(lines[i][j] === '#') { continue; }

            if(path.length > 1 && path.at(-2)[0] === i && path.at(-2)[1] === j) {
                continue;
            }
            if(beforeStart[0] === i && beforeStart[1] === j) {
                continue;
            }
            
            let dpIdx = i*lines[0].length + j;
            if(seen[dpIdx]) {
                pathEnded = true;
                continue;
            }
    
            options.push([i, j]);
        }
        pathEnded ||= options.length !== 1;

        if(pathEnded) {
            if(path.length >= 4) {
                let steps = path.length - 2;

                let start = path[0]
                let end = path.at(-2);
                let dpIdx1 = start[0] * lines[0].length + start[1];
                let dpIdx2 = end[0] * lines[0].length + end[1];

                dp.set(dpIdx1, [end, steps]);
                dp.set(dpIdx2, [start, steps]);

                for(let i of [1, -3]) {
                    let dpIdx_ = path.at(i)[0] * lines[0].length + path.at(i)[1];
                    seen[dpIdx_] = 2;
                }
            }
        }

        if(!pathEnded) {
            path.push(options[0]);
            start = options[0];
        } else {
            let endDpIdx = start[0]*lines[0].length + start[1];
            seen[endDpIdx] = 1;
            for(let option of options) {
                let dpIdx = option[0]*lines[0].length + option[1];
                seen[dpIdx] = 1;
        
                findRuns(lines, option, seen, dp, start);
            }

            if(!options.length) {
                break;
            }
        }
    
    }
}


function directionAllowed(w, h, seen, i, j, lines) {
    let dpIdx = i*w + j;

    if(seen[dpIdx]) {
        return false;
    }

    if(i < 0 || j < 0 || i >= h || j >= w) {
        return false;
    }
    if(lines[i][j] === '#') { return false; }

    return true;
}

function dfs(lines, start, seen, dp) {
    
    let cost = 0;

    
    if(start[0] === (lines.length-1) && start[1] === (lines[0].length-2)) {
        return 0;
    }
    
    let _dpIdx = start[0]*lines[0].length + start[1];
    if(dp.has(_dpIdx)) {
        let [endPoint, steps] = dp.get(_dpIdx);

        let dpIdxEnd = endPoint[0] * lines[0].length + endPoint[1];

        if(!seen[dpIdxEnd]) {
            seen[dpIdxEnd] = 1;
            let ret = steps + dfs(lines, endPoint, seen, dp);
            seen[dpIdxEnd] = 0;
            return ret;
        }
    }

    let options = [];
    let directionsToCheck = directions;
    
    for(let [iOff, jOff] of directionsToCheck) {
        let i = start[0] + iOff;
        let j = start[1] + jOff;

        if(directionAllowed(lines[0].length, lines.length, seen, i, j, lines)) {
            options.push([i, j]);
        }

    }

    if(options.length < 1) {
        return -Infinity;
    }

    let best = 0;
    for(let option of options) {
        let dpIdx = option[0]*lines[0].length + option[1];
        seen[dpIdx] = 1;

        best = Math.max(best, dfs(lines, option, seen, dp) + 1);

        seen[dpIdx] = 0;
    }

    if(best < 1) {
        return -Infinity;
    }
    
    return best;
}


console.time()
console.log(doIt(input))
console.timeEnd()