let input = ``;

let directions = [
    [-1, 0], // UP
    [1, 0], // DOWN
    [0, -1], // LEFT
    [0, 1], // RIGHT
];
let directionNames = new Map([['U', 0], ['D', 1], ['L', 2], ['R', 3]]);


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
        let [directionStr, distanceStr, color] = line.split(' ');
        let direction = directions[directionNames.get(directionStr)];
        let distance = Number(distanceStr);

        let newI = i + direction[0]*distance;
        let newJ = j + direction[1]*distance;

        area += (i+newI)*(j-newJ);

        perimeter += distance;

        i = newI;
        j = newJ;
        lastDirection = direction;
    }

    return Math.abs(area)/2 + perimeter/2 + 1
}

console.time()
console.log(doIt(input))
console.timeEnd()
