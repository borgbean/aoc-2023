let input = ``;

// let maximums = new Map();
// maximums.set('red', 12);
// maximums.set('green', 13);
// maximums.set('blue', 14);

let games = input.split('\n');
let result = 0;
for(let game of games) {
    let parts = game.split(': ')
    let subgames = parts[1].split('; ');

    let counts = {
        blue: 0,
        green: 0,
        red: 0
    };

    for(let subgame of subgames) {
        let colors = subgame.split(', ');


        for(let color of colors) {
            let [count, c] = color.split(' ');

            counts[c] = Math.max(counts[c], count);
        }
    }
    
    result += counts.blue * counts.green * counts.red;

}
console.log(result);
