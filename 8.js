let input = ``;

let winCount = [];

for(let line of input.split('\n')) {
    let colonIdx = line.indexOf(':');

    line = line.substring(colonIdx+1);
    line = line.split('|');
    let [winners, choices] = line;

    winners = winners.trim().split(/\s+/);
    choices = choices.trim().split(/\s+/);

    winners = new Set(winners);

    let count = 0;
    for(let choice of choices) {
        if(winners.has(choice)) {
            ++count;
        }
    }

    winCount.push(count);
}

let totalCount = 0;
let visitCount = new Float64Array(winCount.length).fill(1);
for(let i = 0; i < winCount.length; ++i) {
    totalCount += visitCount[i];

    for(let j = 0; j < winCount[i]; ++j) {
        visitCount[i+j+1] += visitCount[i];
    }
}


console.log(totalCount);