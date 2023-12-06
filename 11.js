let input = ``;
// input = ``;



function doIt(input) {
    input = input.split('\n');
    
    let times = input[0].split(':')[1].trim().split(/\s+/).map(Number);
    let distances = input[1].split(':')[1].trim().split(/\s+/).map(Number).map(x=>x+1);
    
    let product = 1;

    for(let race = 0; race < times.length; ++race) {
        let t = times[race];
        let d = distances[race];

        let minHold = 1;
        let maxHold = t-1;
        

        let cmp = (holdT, reverse) => {
            let guessDist = getTravelled(t, holdT);
            if(guessDist < d) {
                let guessDist2 = getTravelled(t, holdT + 1);
                if(guessDist2 > guessDist) {
                    return -1;
                }
                return 1;
            }
            
            let direction = reverse ? -1 : 1;
            
            let guessDist2 = getTravelled(t, holdT - direction);
            if(guessDist2 < d) {
                return 0;
            }
            return direction;
        }
        let holdL = binarySearch(minHold, maxHold, cmp);
        let holdR = binarySearch(minHold, maxHold, holdT => cmp(holdT, true));

        product *= (1+holdR-holdL);
    }

    return product;
}



function getTravelled(t, holdT) {
    let v = holdT;
    let tLeft = t - holdT;
    let travelled = v*tLeft;

    return travelled;
}

function binarySearch(l, r, cmp) {
    while(l < r) {
        let mid = Math.floor((l+r)/2);

        let c = cmp(mid);
        if(c < 0) {
            l = mid + 1;
        } else if(c > 0) {
            r = mid - 1;
        } else {
            return mid;
        }
    }

    return l;
}


console.log(doIt(input));
