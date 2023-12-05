let input = ``;

let result = 0;

for(let line of input.split('\n')) {
    let colonIdx = line.indexOf(':');

    line = line.substring(colonIdx+1);
    line = line.split('|');
    let [winners, choices] = line;

    winners = winners.trim().split(/\s+/);
    choices = choices.trim().split(/\s+/);

    winners = new Set(winners);

    let curResult = 0;
    for(let choice of choices) {
        if(winners.has(choice)) {
            if(curResult === 0) { curResult = 1; }
            else { curResult *= 2; }
        }
    }

    result += curResult;
}


console.log(result)