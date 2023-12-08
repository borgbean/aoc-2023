let input = ``;

var zzzz = 1e7;
function doIt(input) {
    input = input.split('\n');
    
    let instructions = input[0].split('').map(x=>x==='L' ? 0 : 1);

    let startNodes = [];
    let adjacencies = new Map();
    for(let line of input.slice(2)) {
        let [start, adj] = line.split(' = ');
        adj = adj.substring(1, adj.length-1).split(', ');
        adjacencies.set(start, adj);

        if(start.at(-1) === 'A') {
            startNodes.push(start);
        }
    }

    let result = 1;
    
    //extremely unsatisfying solution.. assumes that for each starting node, we enter an infinite cycle of the same length
    //which is not be true for all possible inputs.... I just noticed they repeat by playing with it.
    for(let startNode of startNodes) {
        let steps = 0;
        let cur = startNode;
        while(cur.at(-1) !== 'Z') {
            let idx = instructions[steps % instructions.length];
            cur = adjacencies.get(cur)[idx];
            ++steps;
        }
        result = (result * steps) / gcd(result, steps);
    }

    return result;

}

function gcd(a, b) {
    while(b) {
        [a, b] = [b, a%b];
    }
    return a;
}
    

console.log(doIt(input));
