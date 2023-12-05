let input = ``;

input = input.split('\n');
let numberRegex = /\d/;
let symbolRegex = /\*/;

function testSymbol(i, j) {
    if(!(i >= 0 && j >= 0 && i < input.length && j < input[i].length)) { return false; }

    return symbolRegex.test(input[i][j]);
}

function gearKey(i, j) {
    return (j*input.length) + i;

}

function getAdjGears(resultSet, i, j) {
    if(testSymbol(i, j+1)) resultSet.add(gearKey(i, j+1));
    if(testSymbol(i-1, j+1)) resultSet.add(gearKey(i-1, j+1));
    if(testSymbol(i+1, j+1)) resultSet.add(gearKey(i+1, j+1));
}

let gears = new Map();

for(let i = 0; i < input.length; ++i) {
    for(let j = 0; j < input[i].length; ++j) {
        let start = j;
        let adjGears = new Set();
        while(j < input[i].length && numberRegex.test(input[i][j])) { 
            getAdjGears(adjGears, i, j);
            ++j; 
        }

        if(j > start) {
            getAdjGears(adjGears, i, start-1);
            getAdjGears(adjGears, i, start-2);
        }

        let number = new Number(input[i].substring(start, j))

        for(let gear of adjGears) {
            let numbersForGear = gears.get(gear)??[];
            numbersForGear.push(number);
            gears.set(gear, numbersForGear);
        }

    }
}

let result = 0;
for(let numbers of gears.values()) {
    if(numbers.length === 2) {
        result += numbers[0]*numbers[1];
    }
}
console.log(result);

