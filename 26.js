let input = ``;
/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split('\n\n');

    let sum = 0;
    for(let puzzle of input) {
        puzzle = puzzle.split('\n');


        let rowMatches = findRowMatches(puzzle);
        if(rowMatches > -1) {
            sum += (rowMatches+1)*100;
        }

        if(rowMatches < 0) {
            sum += findColumnMatches(puzzle)+1;
        }

    
    }
    return sum;
}

function findRowMatches(puzzle) {
    for(let row = 0; row < (puzzle.length-1); ++row) {
        let l = row;
        let r = row+1;
        let match = true;
        let mismatchedRow = false;

        while(l >= 0 && r < puzzle.length) {
            if(puzzle[l] !== puzzle[r]) {
                if(mismatchedRow) {
                    match = false;
                    break;
                } else {
                    mismatchedRow = true;
                    let mismatches = 0;
                    for(let i = 0; mismatches < 2 && i < puzzle[l].length; ++i) {
                        if(puzzle[l][i] !== puzzle[r][i]) { ++mismatches; }
                    }
                    if(mismatches > 1) {
                        match = false;
                        break;
                    }
                }
            }
            --l;
            ++r;
        }

        if(mismatchedRow && match) {
            return row;
        }
    }

    return -1;
}

function findColumnMatches(puzzle) {
    for(let col = 0; col < (puzzle[0].length-1); ++col) {
        let l = col;
        let r = col+1;
        let match = true;
        let mismatchedCol = false;

        let mismatches = 0;
        while(match && l >= 0 && r < puzzle[0].length) {
            for(let row of puzzle) {
                if(row[l] !== row[r]) {
                    if(mismatchedCol) {
                        match = false;
                        break;
                    }
                    mismatchedCol = true;
                    ++mismatches;
                    if(mismatches > 1) {
                        match = false;
                        break;
                    }
                }
            }

            --l;
            ++r;
        }

        if(match && mismatchedCol) {
            return col;
        }
    }
}

console.log(doIt(input));

