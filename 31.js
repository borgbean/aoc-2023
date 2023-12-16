let input = ``;

const RIGHT = 1;
const UP = 2;
const LEFT = 4;
const DOWN = 8;
const VISITED = 16;

/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split('\n');

    let h = input.length;
    let w = input[0].length;

    let travelledByNode = new Uint8Array(w * h);
    let touchedCnt = 0;

    //[i, j], [iInc, jInc]
    let toTravel = [];

    function travelTo(coords, directions, directionMask) {
        let dpIdx = (coords[0] * w) + coords[1];
        if ((travelledByNode[dpIdx] & directionMask) !== 0) {
            return;
        }
        travelledByNode[dpIdx] |= directionMask;

        toTravel.push([coords, directions]);
    }

    travelTo([0, -1], [0, 1], RIGHT);

    while (toTravel.length) {
        let [[i, j], [iInc, jInc]] = toTravel.pop();
        
        i += iInc;
        j += jInc;


        for (; i < h && i >= 0 && j < w && j >= 0; i += iInc, j += jInc) {
            let dpIdx = (i*w) + j;
            if((travelledByNode[dpIdx]&VISITED) === 0) {
                ++touchedCnt;
                travelledByNode[dpIdx] |= VISITED;
            }

            if (input[i][j] === '-') {
                if (iInc !== 0) {
                    travelTo([i, j], [0, 1], RIGHT);
                    travelTo([i, j], [0, -1], LEFT);
                    break;
                }
            } else if (input[i][j] === '|') {
                if (jInc !== 0) {
                    travelTo([i, j], [-1, 0], UP);
                    travelTo([i, j], [1, 0], DOWN);
                    break;
                }
            } else if (input[i][j] === '/') {
                if (directionOrd(iInc, jInc) === RIGHT) {
                    travelTo([i, j], [-1, 0], UP);
                } if (directionOrd(iInc, jInc) === UP) {
                    travelTo([i, j], [0, 1], RIGHT);
                } else if (directionOrd(iInc, jInc) === LEFT) {
                    //go down
                    travelTo([i, j], [1, 0], DOWN);
                } else if (directionOrd(iInc, jInc) === DOWN) {
                    //go left
                    travelTo([i, j], [0, -1], LEFT);
                }

                break;
            } else if (input[i][j] === '\\') {
                if (directionOrd(iInc, jInc) === RIGHT) {
                    //go down
                    travelTo([i, j], [1, 0], DOWN);
                } if (directionOrd(iInc, jInc) === UP) {
                    travelTo([i, j], [0, -1], LEFT);
                } else if (directionOrd(iInc, jInc) === LEFT) {
                    travelTo([i, j], [-1, 0], UP);
                } else if (directionOrd(iInc, jInc) === DOWN) {
                    travelTo([i, j], [0, 1], RIGHT);
                }

                break;
            }
        }
    }


    return touchedCnt;
}

function directionOrd(i, j) {
    if(j === 1) {
        return RIGHT;
    } else if(i === -1) {
        return UP;
    } else if(j === -1) {
        return LEFT;
    } else if(i === 1) {
        return DOWN;
    }
}

console.time()
console.log(doIt(input))
console.timeEnd()

