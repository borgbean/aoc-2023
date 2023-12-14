let input = ``;
/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split('\n').map(x => x.split(''));
    
    let sum = 0;
    for(let i = 0; i < input.length; ++i) {
        for(let j = 0; j < input[0].length; ++j) {
            if(input[i][j] === 'O') {
                let newRow = moveUp(input, i, j);
                sum += input.length-newRow;
            }
        }
    }

    return sum;
}

function moveUp(input, i, j) {
    while(i > 0) {
        if(input[i-1][j] === '.') {
            input[i-1][j] = 'O';
            input[i][j] = '.';
            --i;
        } else {
            return i;
        }
    }

    return 0;
}

console.log(doIt(input));

