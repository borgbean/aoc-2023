let input = ``;

/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split(',');

    let boxes = [];

    for(let str of input) {

        if(str.at(-1) !== '-') {
            let [label, focalLen] = str.split('=');
            focalLen = Number(focalLen);
            let boxIdx = getHash(label);

            boxes[boxIdx] ||= [];
            
            let boxContents = boxes[boxIdx];
            let found = false;
            for(let i = 0; i < boxContents.length; ++i) {
                if(boxContents[i][0] === label) {
                    found = true;
                    boxContents[i][1] = focalLen;
                    break;
                }
            }

            if(!found) {
                boxContents.push([label, focalLen]);
            }
        } else {
            let label = str.substring(0, str.length-1);
            let boxIdx = getHash(label);

            
            
            let boxContents = boxes[boxIdx];
            if(boxContents) {
                for(let i = 0; i < boxContents.length; ++i) {
                    if(boxContents[i][0] === label) {
                        boxContents.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }


    let sum = 0;
    for(let i = 0; i < boxes.length; ++i) {
        let boxContents = boxes[i];
        if(!boxContents) {
            continue;
        }

        for(let j = 0; j < boxContents.length; ++j) {
            let power = 1 + i;
            power *= j + 1;
            power *= boxContents[j][1];

            sum += power;
        }
    }

    return sum;
}

function getHash(str) {
    let hash = 0;
    for(let i = 0; i < str.length; ++i) {
        let chr = str.charCodeAt(i);
        hash += chr;
        hash *= 17;
        hash = hash % 256;
    }

    return hash;
}

console.log(doIt(input));

