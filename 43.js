let input = ``;

/**
 * 
 * @param {string} rawInput 
 */
function doIt(rawInput) {
    let bricks = rawInput
                    .split('\n')
                    .map(line => 
                        line.split('~')
                            .map(x=>x.split(',').map(Number)));


    //sort by lowest point of bricks desc
    bricks.sort((a, b) => a[0][2] - b[0][2]);

    let disintegrated = 0;

    let bricksToBricksBelow = bricks.map(x=>[]);

    for(let i = 0; i < bricks.length; ++i) {
        let upperBrick = bricks[i];

        if(upperBrick[0][2] === 1) { continue; }

        let intersections = [];

        let matchedLevel = 1;
        for(let j = i-1; j >= 0; --j) {
            let lowerBrick = bricks[j];
            
            if((lowerBrick[1][2]+1)>=matchedLevel 
                    && lowerBrick[1][2] < upperBrick[0][2] &&
                    intersects(upperBrick, lowerBrick)) {
                let newMatchedLevel = lowerBrick[1][2] + 1;
                if(newMatchedLevel < matchedLevel) {
                    continue;
                } else if(newMatchedLevel > matchedLevel) {
                    intersections.length = 0;
                    matchedLevel = newMatchedLevel;
                }

                intersections.push(j);
            }
        }

        bricksToBricksBelow[i].push(...intersections);

        let diff = upperBrick[1][2] - upperBrick[0][2];
        if(matchedLevel !== upperBrick[0][2]) {
            upperBrick[0][2] = matchedLevel;
            upperBrick[1][2] = matchedLevel + diff;
        }
    }

    disintegrated = bricks.length;

    for(let i = 0; i < bricksToBricksBelow.length; ++i) {
        if(bricksToBricksBelow[i].length === 1 && bricks[bricksToBricksBelow[i][0]] !== null) {
            --disintegrated;

            bricks[bricksToBricksBelow[i][0]] = null;
        }
    }

    return disintegrated;
}


function intersects([brick1Start, brick1End], [brick2Start, brick2End]) {
    let xOverlaps = brick1End[0] >= brick2Start[0] == brick1Start[0] <= brick2End[0];
    let yOverlaps = brick1End[1] >= brick2Start[1] == brick1Start[1] <= brick2End[1];

    return xOverlaps && yOverlaps;
}



console.time()
console.log(doIt(input))
console.timeEnd()

