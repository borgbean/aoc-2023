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
    let bricksToBricksAbove = bricks.map(x=>[]);

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

        for (let brick of intersections) {
            bricksToBricksAbove[brick].push(i);
            bricksToBricksBelow[i].push(brick);
        }

        let diff = upperBrick[1][2] - upperBrick[0][2];
        if(matchedLevel !== upperBrick[0][2]) {
            upperBrick[0][2] = matchedLevel;
            upperBrick[1][2] = matchedLevel + diff;
        }
    }

    let top = [];
    for(let i = 0; i < bricksToBricksAbove.length; ++i) {
        if(bricksToBricksAbove[i].length === 0) {
            top.push(i);
        }
    }


    let sum = 0;

    function cascade(brickId) {
        //we need a copy since we're modifying it
        let childCounts = bricksToBricksBelow.map(x => x.length);

        let q = [brickId];
        let fallen = 0;

        while(q.length) {
            let cur = q.pop();

            for(let parent of bricksToBricksAbove[cur]) {
                if(--childCounts[parent] === 0) {
                    q.push(parent);
                    ++fallen;
                }
            }

        }

        return fallen;
    }

    for(let i = 0; i < bricks.length; ++i) {
        sum += cascade(i);
    }

    disintegrated = sum;


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

