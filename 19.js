let input = ``;

function doIt(input) {
    input = input.split('\n');

    let w = input[0].length, h = input.length;
    let adjList = [];
    
    let start = null;
    let idx = 0;
    for(let i = 0; i < input.length; ++i) {
        let line = input[i];
        for(let j = 0; j < line.length; ++j) {
            let chr = line[j];
            if(chr === 'S') {
                start = idx;
            } else if(chr === '.') {
            } else if(chr === '|') {
                setAdj(adjList, idx, idx + w, idx - w);
            } else if(chr === '-') {
                setAdj(adjList, idx, idx + 1, idx - 1);
            } else if(chr === 'L') {
                setAdj(adjList, idx, idx - w, idx + 1);
            } else if(chr === 'J') {
                setAdj(adjList, idx, idx - w, idx - 1);
            } else if(chr === '7') {
                setAdj(adjList, idx, idx + w, idx - 1);
            } else if(chr === 'F') {
                setAdj(adjList, idx, idx + w, idx + 1);
            }
            

            ++idx;
        }
    }

    let q = [...adjList[start]];
    let q2 = [];  
    let dist = 0;
    
    while(q.length) {
        let cur = q.pop();
        let adj = adjList[cur];

        let done = false;
        for(let neighbor of adj) {
            if(!adjList[neighbor].includes(cur)) {
                done = true;
                break;
            }
            adjList[neighbor] = adjList[neighbor].filter(x=>x!==cur);
            q2.push(neighbor);
        }
        if(done) {
            break;
        }


        if(!q.length) {
            [q2, q] = [q, q2];
            ++dist;
        }
    }


    return dist;
}


function setAdj(adjList, start, v1, v2) {
    adjList[start] = [v1, v2];
    if(!adjList[v1] || adjList[v1].length < 2) {
        adjList[v1] ||= [];
        adjList[v1].push(start);
    }
    if(!adjList[v2] || adjList[v2].length < 2) {
        adjList[v2] ||= [];
        adjList[v2].push(start);
    }
}


console.log(doIt(input));
