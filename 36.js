let input = ``;

let directions = [
    [-1, 0], // UP
    [1, 0], // DOWN
    [0, -1], // LEFT
    [0, 1], // RIGHT
];
let directionNames = new Map([['3', 0], ['1', 1], ['2', 2], ['0', 3]]);


/**
 * 
 * @param {string} rawInput 
 * @returns 
 */
function doIt(rawInput) {
    let lines = rawInput.split('\n');


    let area = 0
    let perimeter = 0;

    let i = 0;
    let j = 0;

    let lastDirection = null;
    for(let line of lines) {
        let [_, __, color] = line.split(' ');
        let direction = directions[directionNames.get(color.at(-2))];
        let distance = parseInt(color.substring(2, color.length-2), 16);

        let newI = i + direction[0]*distance;
        let newJ = j + direction[1]*distance;

        area += (i+newI)*(j-newJ);

        perimeter += distance;

        i = newI;
        j = newJ;
        lastDirection = direction;
    }

    return Math.abs(area)/2 + perimeter/2 + 1;
}

console.time()
console.log(doIt(input))
console.timeEnd()
