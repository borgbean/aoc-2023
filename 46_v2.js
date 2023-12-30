/*
Awful code... NOTE: you MUST pre-trim the input (no newline at end!)
*/

let input = ``;

let directions = [[0, 1],[1, 0]];

function doIt(rawInput) {
    let w = rawInput.indexOf('\n');
    let h = Math.floor((1+rawInput.length)/(w+1));

    let adjList = new Map();

    let startIdx = 1;
    let targetIdx = (h-1)*(w+1) + (w-2);

    for(let i = 0; i < rawInput.length; i += (w+1)) {
        for(let j = i; j < (i+w); ++j) {
            if(rawInput[j] === '#') { continue; }

            let dpIdx = j;
            let init = false;
            
            for(let [iOff, jOff] of directions) {
                let dpIdx2 = j + jOff;
                if(dpIdx2 < i || dpIdx2 >= (i+w)) { continue; }
                dpIdx2 += iOff*(w+1);
                if(dpIdx2 < 0 || dpIdx2 >= rawInput.length) { continue; }
                
                if(rawInput[dpIdx2] === '#') { continue; }

                if(!init) {
                    adjList.set(dpIdx, adjList.get(dpIdx)??[]);
                }

                adjList.set(dpIdx2, adjList.get(dpIdx2)??[]);

                adjList.get(dpIdx).push([dpIdx2, 1]);
                adjList.get(dpIdx2).push([dpIdx, 1]);
            }

        }
    }

    let adjListMapping = new Map();
    let newAdjList = [];
    for(let key of adjList.keys()) {
        if(adjList.get(key).length === 2 && key !== startIdx && key !== targetIdx) {
            let v2s = adjList.get(key).map(x => x[0]);

            let cost = v2s.reduce((acc, x) => acc + adjList.get(x).find(y=>y[0]===key)[1], 0);
            let xor = v2s.reduce((acc, x) => acc^x);
            
            for(let v of v2s) {
                let list = adjList.get(v);
                let otherV = xor ^ v;
                for(let i = 0; i < list.length; ++i) {
                    if(list[i][0] === key) {
                        list[i][0] = otherV;
                        list[i][1] = cost;
                    }
                }
            }

            adjList.delete(key);
        } else {
            adjListMapping.set(key, adjListMapping.size);
            newAdjList.push([]);
        }
    }
    startIdx = adjListMapping.get(startIdx);
    targetIdx = adjListMapping.get(targetIdx);
    for(let key of adjList.keys()) {
        for(let [v2, w] of adjList.get(key)) {
            newAdjList[adjListMapping.get(key)].push([adjListMapping.get(v2), w]);
        }
    }
    adjList = null;
    adjListMapping = null;
    input = null;

    let seen = new Uint8Array(newAdjList.length);
    let a = dfs(targetIdx, startIdx, newAdjList, seen);
    return a;
}

function dfs(target, pos, adjList, seen) {
    if(target === pos) {
        return 0;
    }
    
    let seenAll = true;
    for(let [v2, _] of adjList[target]) {
        if(v2 === pos || !seen[v2]) {seenAll = false; break;}
    }
    if(seenAll) { return -Infinity; }
    
    seen[pos] = 1;

    let best = -Infinity;
    for(let [v2, weight] of adjList[pos]) {
        if(seen[v2]) {
            continue;
        }
        
        best = Math.max(best, weight + dfs(target, v2, adjList, seen));
    }

    seen[pos] = 0;

    return best;
}


console.time()
console.log(doIt(input))
console.timeEnd()