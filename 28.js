let input = ``;

let ROCK = 'O';
let OPEN_SPOT = '.';
let OBSTRUCTION = '#';

/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split('\n').map(x => x.split(''));


    let spunInputs = [stringify(input)];
    let spunInputToIdx = new Map();
    spunInputToIdx.set(spunInputs[0], 0)

    for(let spins = 0; spins < 9001; ++spins) {
        spin(input);
        let stringified = stringify(input);
        if(spunInputToIdx.has(stringified)) {
            let cycleStart = spunInputToIdx.get(stringified);
            let cycleLength = 1+spins - cycleStart;

            let target = 1000000000 - cycleStart;

            return getLoad(spunInputs[cycleStart + (target % cycleLength)]);
        }
        spunInputs[spins+1] = stringified;
        spunInputToIdx.set(stringified, spins+1);
    }


    return -1;
}

function stringify(input) {
    return input.map(x=>x.join('')).join('\n');
}
function getLoad(input) {
    input = input.split('\n');
    let sum = 0;
    for(let i = 0; i < input.length; ++i) {
        for(let j = 0; j < input[0].length; ++j) {
            if(input[i][j] === ROCK) {
                sum += input.length-i;
            }
        }
    }
    return sum;
}
function spin(input) {
    for(let fn of [moveN, moveW, moveS, moveE]) {
        if(fn === moveS || fn === moveE) {
            for(let j = 0; j < input[0].length; ++j) {
                for(let i = 0; i < input.length; ++i) {
                    fn.call(null, input, i, j);
                }
            }
        } else {
            for(let i = 0; i < input.length; ++i) {
                for(let j = 0; j < input[0].length; ++j) {
                    fn.call(null, input, i, j);
                }
            }
        }
    }
}

function moveN(input, i, j) {
    if(input[i][j] !== ROCK) {
        return;
    }
    while(i > 0) {
        if(input[i-1][j] === OPEN_SPOT) {
            input[i-1][j] = ROCK;
            input[i][j] = OPEN_SPOT;
            --i;
        } else {
            return;
        }
    }
}

function moveS(input, i, j) {
    i = (input.length-1) - i;
    if(input[i][j] !== ROCK) {
        return;
    }

    while(i < (input.length-1)) {
        if(input[i+1][j] === OPEN_SPOT) {
            input[i+1][j] = ROCK;
            input[i][j] = OPEN_SPOT;
            ++i;
        } else {
            return;
        }
    }
}

function moveE(input, i, j) {
    j = (input[0].length-1) - j;
    
    if(input[i][j] !== ROCK) {
        return;
    }
    while(j < (input[0].length-1)) {
        if(input[i][j+1] === OPEN_SPOT) {
            input[i][j+1] = ROCK;
            input[i][j] = OPEN_SPOT;
            ++j;
        } else {
            return;
        }
    }
}

function moveW(input, i, j) {
    if(input[i][j] !== ROCK) {
        return;
    }

    while(j > 0) {
        if(input[i][j-1] === OPEN_SPOT) {
            input[i][j-1] = ROCK;
            input[i][j] = OPEN_SPOT;
            --j;
        } else {
            return;
        }
    }
}

console.log(doIt(input));

