let input = ``;

function doIt(input) {
    input = input.split('\n');
    
    let sum = 0;
    let dp = new Float64Array(1).fill(-1);

    for(let line of input) {
        let [data, groups] = line.split(' ');
        data = data.replace(/\.+/g, '.');       
        groups = groups.split(',').map(Number);
        
        let dpLen = groups.length*data.length;
        if(dpLen > dp.length) {
            dp = new Float64Array(dpLen);
        }
        dp.fill(-1);
        var tmp = dfs(dp, groups, 0, data, 0);
        sum += tmp;

    }

    return sum;
}
function dfs(dp, groups, groupL, data, dataL) {
    let dpIdx = (groupL*data.length) + dataL;
    if(dp[dpIdx] > -1) {
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

console.log(doIt(input));

