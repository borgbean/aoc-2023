let input = ``;

/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split('\n');
    
    let sum = 0;
    let dp = new Float64Array(1).fill(-1);
    let dp2 = new Float64Array(1).fill(-1);

    for(let line of input) {
        let [data, groups] = line.split(' ');
        data = data.replace(/\.+/g, '.');
        
        data = data + ('?' + data).repeat(4);
        groups = groups + (',' + groups).repeat(4);
        
        groups = groups.split(',').map(Number);
        
        let dpLen = data.length+1;
        if(dpLen > dp.length) {
            //resize dp array
            dp = new Float64Array(dpLen);
            dp2 = new Float64Array(dpLen);
        }
        dp.fill(0);
        dp2.fill(0);

        sum += getCombinations(data, groups, dp, dp2);
    }

    return sum;
}

function getCombinations(data, groups, dp, prevDp) {
    let l = 0;
    
    let sum = 1;

    for(let group of groups) {
        let foundCombination = false;
        for(let i = l + group; i <= data.length; ++i) {
            let dataL = i - group;
            
            if(dataL > 0) {
                sum += prevDp[dataL-1];
            }

            if(canPlaceHere(data, dataL, group)) {
                if(sum > 0 && !foundCombination) {
                    foundCombination = true;
                    l = i;
                }
                dp[i] = sum;
            }

            if(dataL >= 0 && data[dataL] === '#') {
                sum = 0;
            }

        }
        sum = 0;
        
        [dp, prevDp] = [prevDp, dp];
        dp.fill(0);
        max = 0;
    }

    let ret = 0;
    for(let i = data.length-1; i > 0; --i) {
        ret += prevDp[i+1];
        
        if(data[i] === '#') {
            break;
        }
    }

    return ret;
}

function canPlaceHere(data, dataL, groupSize) {
    
    //can't have # before start or after end
    if(dataL > 0 && data[dataL-1] === '#') { return false; }
    if((dataL+groupSize) < data.length && data[dataL+groupSize] === '#') { return false; }

    while(dataL < data.length && groupSize > 0) {
        if(data[dataL] === '.') { break; }

        --groupSize;

        ++dataL;
    }

    return groupSize === 0;
}


console.time()
console.log(doIt(input));
console.timeEnd()

