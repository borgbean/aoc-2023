let input = ``;

input = input.split('\n');
let numberRegex = /\d/;
let symbolRegex = /[^\d\.]/;

function testSymbol(i, j) {
    if(!(i >= 0 && j >= 0 && i < input.length && j < input[i].length)) { return false; }

    return symbolRegex.test(input[i][j]);
}

function hasSymbolNeighbor(i, j) {
    
    return testSymbol(i-1, j) ||
        testSymbol(i+1, j) ||
        testSymbol(i-1, j-1) ||
        testSymbol(i-1, j+1) ||
        testSymbol(i, j-1) ||
        testSymbol(i, j+1) ||
        testSymbol(i+1, j) ||
        testSymbol(i+1, j-1) ||
        testSymbol(i+1, j+1);

}

let result = 0;
for(let i = 0; i < input.length; ++i) {
    for(let j = 0; j < input[i].length; ++j) {
        let start = j;
        let hasSymbol = false;
        while(j < input[i].length && numberRegex.test(input[i][j])) { 
            hasSymbol ||= hasSymbolNeighbor(i, j);
            ++j; 
        }

        if(hasSymbol) {
            result += new Number(input[i].substring(start, j));
        }
    }

}
console.log(result);

