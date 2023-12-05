let input = ``;

input = input.split('\n');
let seeds = input[0].split(': ')[1].split(' ').map(Number);

let mappings = [];

for(let i = 2; i < input.length; ++i) {
    ++i;

    let mapping = [];
    while(i < input.length && input[i].trim() !== '') {
        let mappingData = input[i].split(/\s+/).map(Number);
        mapping.push(mappingData);
        ++i;
    }

    mappings.push(mapping);
}

let inputs = seeds;
for(let mapping of mappings) {
    let newInputs = [];
    for(let input of inputs) {
        let found = false;
        for(let mappingData of mapping) {
            if(input >= mappingData[1] && input < (mappingData[1] + mappingData[2])) {
                found = true;
                newInputs.push(mappingData[0] + (input-mappingData[1]));
            }
        }

        if(!found) {
            newInputs.push(input);
        }
    }
    inputs = newInputs;
}

console.log(inputs.sort((a, b) => a-b)[0])



