let input = ``;


function doIt(input) {
    input = input.split('\n').map(x => x.split(''));

    input = removeTrash(input);
    
    let count = 0;

    for(let i = 0; i < input.length; ++i) {
        let line = input[i];
        for(let j = 0; j < line.length; ++j) {
            let chr = line[j];
            if(chr === '.') {
                let start = j;
                while(j < line.length) {
                    if(input[i][j] !== '.') {
                        break;
                    }
                    ++j;
                }
                if((getIntersectionsRight(input, i, j) % 2) !== 0) {
                    //we're inside the cycle
                    //if there's an even number of intersections we're on the outside
                    //(try drawing it on paper and drawing an intersection line)
                    count += j-start;
                }
            }
        }
    }


    return count;
}


function getIntersectionsRight(input, i, j) {
    let intersections = 0;
    while(j < input[i].length) {
        if(input[i][j] === '|') {
            ++intersections;
        }
        
        if(input[i][j] === '7' || input[i][j] === 'F') {
            ++intersections;
        }
        ++j;
    }

    return intersections;
}



function removeTrash(input) {

    let w = input[0].length, h = input.length;
    let adjList = [];
    
    let start = null;
    let idx = 0;
    for(let i = 0; i < input.length; ++i) {
        let line = input[i];
        for(let j = 0; j < line.length; ++j) {
            let chr = line[j];
            if(chr === 'S') {
                input[i][j] = '7';
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

    {
        //fix up starting node type
        let [v1, v2] = adjList[start];
        let sub;
        if(Math.abs(v1-start) === 1 && Math.abs(v2-start) === 1) {
            sub = '-';
        } else if(Math.abs(v1-start) === w && Math.abs(v2-start) === w) {
            sub = '|';
        } else {
            let haveLeft = start-v1 === 1 || start-v2 === 1;
            let haveRight = start-v1 === (-1) || start-v2 === (-1);
            let haveUp = start-v1 === w || start-v2 === w;
            let haveDown = start-v1 === (-w) || start-v2 === (-w);

            if(haveLeft && haveDown) {
                sub = '7';
            } else if(haveUp && haveLeft) {
                sub = 'J';
            } else if(haveUp && haveRight) {
                sub = 'L'
            } else if(haveDown && haveRight) {
                sub = 'F';
            }
        }

        input[Math.floor(start/w)][start%w] = sub;
    }
    
    let stack = [...adjList[start]];
    //rather than figure out what to remove, make a new, empty matrix,
    //traverse the graph, then add all the vertices we actually encounter to the copy
    let newInput = input.map(x => input[0].map(x=>'.'));
    while(stack.length) {
        let cur = stack.pop();
        let adj = adjList[cur];

        newInput[Math.floor(cur/w)][(cur%w)] = input[Math.floor(cur/w)][(cur%w)];

        for(let neighbor of adj) {
            if(!adjList[neighbor].includes(cur)) {
                break;
            }
            adjList[neighbor] = adjList[neighbor].filter(x=>x!==cur);
            stack.push(neighbor);
        }
    }


    return newInput;
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


