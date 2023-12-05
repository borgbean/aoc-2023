let input = ``;

function makePairs(arr) {
    let ret = [];
    for(let i = 0; i < arr.length; ++i) {
        ret.push([arr[i], arr[i] + arr[i+1]]);
        ++i;
    }

    return ret;
}


input = input.split('\n');
let seeds = input[0].split(': ')[1].split(' ').map(Number);
seeds = makePairs(seeds);

let mappings = [];

for(let i = 2; i < input.length; ++i) {
    ++i;

    let mapping = [];
    while(i < input.length && input[i].trim() !== '') {
        let mappingData = input[i].split(/\s+/).map(Number);
        mapping.push(mappingData);
        ++i;
    }

    mapping.push([0, 0, Infinity]);

    mappings.push(mapping);
}

let inputs = seeds;
for(let mapping of mappings) {
    let newInputs = [];
    for(let input of inputs) {
        let unfound = [input];
        while(unfound.length) {

            let cur = unfound.pop();

            //mappingData: [soil_start, seed_start, length]
            for(let mappingData of mapping) {
                let mappingSeedStart = mappingData[1];
                let mappingSeedEnd = mappingSeedStart + mappingData[2];
                let mappingSoilStart = mappingData[0];

                if(mappingSeedStart < cur[1] && mappingSeedEnd > cur[0]) {
                    let lSize = Math.max(0, mappingSeedStart - cur[0]);
                    let rSize = Math.max(0, cur[1] - mappingSeedEnd);
                    let taken = (cur[1]-cur[0]) - (lSize+rSize);

                    

                    let mappedStart = mappingSoilStart;
                    if(cur[0] > mappingSeedStart) {
                        mappedStart += cur[0] - mappingSeedStart;
                    }

                    let mappedEnd = mappedStart + taken;
                    newInputs.push([mappedStart, mappedEnd]);

                    if(lSize > 0) {
                        unfound.push([cur[0], mappingSeedStart]);
                    }
                    if(rSize > 0) {
                        unfound.push([mappingSeedEnd, cur[1]]);
                    }

                    break;
                }
            }
        }
    }
    inputs = newInputs;
}

console.log(inputs.sort((a, b) => a[0]-b[0])[0][0])



