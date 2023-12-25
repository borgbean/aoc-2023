let eps = Number.EPSILON*50;

let input = ``;

function doIt(rawInput) {
    let lines = rawInput.split('\n');


    let stones = [];

    for(let line of lines) {
        let [stone, v] = line.split('@').map(x => x.split(',').map(Number));


        stones.push([{x: stone[0], y: stone[1], z: stone[2]}, {x: v[0], y: v[1], z: v[2]}]);
    }

    let min = 200000000000000;
    let max = 400000000000000;
    let ints = 0;
    for(let i = 0; i < stones.length; ++i) {
        for(let j = i+1; j < stones.length; ++j) {
            let s1 = stones[i];
            let s2 = stones[j];
            let int = intersect(s1, s2);
                    
            if(int === false) {
                continue;
            }

            let match = true;
            for(let dimen of ['x', 'y']) {
                if(int[dimen] < min || int[dimen] > max) {
                    if(!intersect(s1, s2)){
                        console.log(intersect(s1, s2))
                    }
                    match = false;
                    break;
                }
            }

            if(match) {
                ++ints;
            }
        }
    }

    return ints;
}



function intersect(stone1, stone2) {
    let m1 = stone1[1].y/stone1[1].x;
    let m2 = stone2[1].y/stone2[1].x;
    
    let b1 = stone1[0].y - stone1[1].y*(stone1[0].x/stone1[1].x);
    let b2 = stone2[0].y - stone2[1].y*(stone2[0].x/stone2[1].x);
    

    if(Math.abs(m1-m2) < eps) {
        return false;
    }

    let xIntersect = (b1 - b2) / (m2-m1);

    for(let stone of [stone1, stone2]) {
        if(!((xIntersect - stone[0].x) < 0) === (stone[1].x < 0)) {
            //going backwards!
            return false;
        }
    }

    let t = (xIntersect - stone1[0].x)/stone1[1].x;

    return {
        x: xIntersect,
        y: stone1[0].y + t*stone1[1].y
    }
}

console.log(doIt(input));


