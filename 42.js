let doIt = require('./41').doIt

function doIt2(target) {

    let even = 0;
    let odd = 0;

    let cycleEven = doIt(132, false);
    let cycleOdd = doIt(131, false);

    let cube = 0;
    
    let remaining = target;
    
    let evenB = true;

    for(let i = 131; i <= target; i += 131) {
        if(evenB) {
            even += cycleEven*cube;
            odd += cycleOdd*cube;
        } else {
            even += cycleOdd*cube; // the starting point for these tiles is 131 (not 0) - so even and odd is inverted
            odd += cycleEven*cube;
        }
        evenB = !evenB;
        cube += 4;
    
        remaining -= 131;
    }

    let result = 0;
    
    if((target%2) === 0) {
        result += even;
        result += cycleEven;
    } else {
        result += odd;
        result += cycleOdd;
    }


    //Do straights (n, s, e, w) - other tiles are first found DIAGONALLY,
    //so are handled below
    result += doIt(remaining + 65, false, [0, 65]);
    result += doIt(remaining + 65, false, [65, 0]);
    result += doIt(remaining + 65, false, [130, 65]);
    result += doIt(remaining + 65, false, [65, 130]);


    //find top left, bottom left, etc - MINUS the straights
    result += doIt(65 + remaining + 65, false, [0, 0])*((cube-4)/4);
    result += doIt(65 + remaining + 65, false, [130, 0])*((cube-4)/4);
    result += doIt(65 + remaining + 65, false, [0, 130])*((cube-4)/4);
    result += doIt(65 + remaining + 65, false, [130, 130])*((cube-4)/4);


    //the straights might be partially into another tile
    if(remaining > 65) {
        result += doIt(remaining-66, false, [0, 65]);
        result += doIt(remaining-66, false, [65, 0]);
        result += doIt(remaining-66, false, [130, 65]);
        result += doIt(remaining-66, false, [65, 130]);
    }

    //do the diagonals that are partially into another tile
    result += doIt(remaining-1, false, [0, 0])*(cube/4);
    result += doIt(remaining-1, false, [130, 0])*(cube/4);
    result += doIt(remaining-1, false, [0, 130])*(cube/4);
    result += doIt(remaining-1, false, [130, 130])*(cube/4);



    return result;
    
}

console.log(doIt2(26501365))
