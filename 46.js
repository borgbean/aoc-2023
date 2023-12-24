let input = ``;

let directions = [[0, 1],
                  [0, -1],
                  [1, 0],
                  [-1, 0]];

let slopes = new Map(
    [['^', directions[3]],
    ['>',  directions[0]],
    ['v',  directions[2]],
    ['<',  directions[1]]]
);

function doIt(rawInput) {
    let lines = rawInput.split('\n');

    let start = [0, 1];
    let seen = new Uint8Array(lines.length * lines[0].length);
    seen[1] = 1;

    return dfs(lines, start, seen, []);
}

function directionAllowed(w, h, seen, i, j, lines) {
    let dpIdx = i*w + j;

    if(seen[dpIdx] === 1) {
        return false;
    }

    if(i < 0 || j < 0 || i >= h || j >= w) {
        return false;
    }
    if(lines[i][j] === '#') { return false; }

    return true;
}

function dfs(lines, start, seen, dp) {
    dp.push(start);
    if(start[0] === (lines.length-1) && start[1] === (lines[0].length-2)) {
        return 0;
    }

    let options = [];
    let curSquare = lines[start[0]][start[1]];
    let directionsToCheck = directions;
    if(slopes.has(curSquare)) {
        directionsToCheck = [slopes.get(curSquare)];
    }
    
    for(let [iOff, jOff] of directionsToCheck) {
        let i = start[0] + iOff;
        let j = start[1] + jOff;

        if(directionAllowed(lines[0].length, lines.length, seen, i, j, lines)) {
            options.push([i, j]);
        }

    }

    if(options.length < 1) {
        dp.pop();
        return -Infinity;
    }

    let best = 0;
    for(let option of options) {
        let dpIdx = option[0]*lines[0].length + option[1];
        seen[dpIdx] = 1;

        best = Math.max(best, dfs(lines, option, seen, dp) + 1);

        seen[dpIdx] = 0;
    }

    dp.pop();
    if(best < 1) {
        return -Infinity;
    }
    return best;
}

console.log(doIt(input))