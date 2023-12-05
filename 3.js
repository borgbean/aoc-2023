let input = ``;

let maximums = new Map();
maximums.set('red', 12);
maximums.set('green', 13);
maximums.set('blue', 14);

let games = input.split('\n');
let result = 0;
for(let game of games) {
    let parts = game.split(': ')
    let subgames = parts[1].split('; ');
    let possible = true;
    for(let subgame of subgames) {
        let colors = subgame.split(', ');


        for(let color of colors) {
            let [count, c] = color.split(' ');

            if(maximums.get(c) < count) {
                possible = false;
                break;
            }
        }
        if(!possible) {
            break;
        }
    }
    if(possible) {
        let id = parts[0].substring('Game '.length);
        result += new Number(id);
    }

}
console.log(result);
