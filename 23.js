let input = ``;

function doIt(input) {
    input = input.split('\n');
    
    let sum = 0;

    for(let line of input) {
        let dp = [];
        let [data, groups] = line.split(' ');
        data = data.replace(/\.+/g, '.');
        groups = groups.split(',').map(Number);
        
        var tmp = dfs(dp, groups, 0, data, 0);
        sum += tmp;

    }

    return sum;
}
function dfs(dp, groups, groupL, data, dataL) {
    let dpIdx = (groupL*data.length) + dataL;
    if(dpIdx in dp) {
        return dp[dpIdx];
    }
    
    if(groupL >= groups.length) {
        //check if there's a spring we didn't include
        for(let i = dataL; i < data.length; ++i) {
            if(data[i] === '#') {
                return 0;
            }
        }
        return 1;
    }
    
    let i = dataL;
    while(i < data.length && data[i] === '.') {
        i++;
    }
    if(i >= data.length) { return 0; }

    let sum = 0;

    //try not taking this option
    if(data[i] === '?') {
        sum += dfs(dp, groups, groupL, data, i+1);
    }
    
    //we're going to try to take a group here
    let needed = groups[groupL];
    while(i < data.length && needed > 0) {
        if(data[i] === '.') { break; }

        --needed;

        ++i;
    }

    //if needed > 0, there was some '.' preventing us from taking 1 continuous block
    if(needed === 0) {
        if(data[i] !== '#') {
            sum += dfs(dp, groups, groupL+1, data, i+1);
        }
    }

    dp[dpIdx] = sum;

    return sum;
}

console.time()
console.log(doIt(input));
console.timeEnd()

