let input = ``;

function doIt(input) {
    input = input.split('\n');
    
    let instructions = input[0].split('');

    let adjacencies = new Map();
    for(let line of input.slice(2)) {
        let [start, adj] = line.split(' = ');
        adj = adj.substring(1, adj.length-1).split(', ');
        adjacencies.set(start, adj);
    }

    let cur = 'AAA';
    let steps = 0;
    while(cur !== 'ZZZ') {
        let idx = instructions[steps % instructions.length] === 'R' ? 1 : 0;

        cur = adjacencies.get(cur)[idx];

        ++steps;
    }

    return steps;
}


console.log(doIt(input));
