let input = ``;

/**
 * 
 * @param {string} input 
 * @returns 
 */
function doIt(input) {
    input = input.split(',');

    let sum = 0;
    for(let str of input) {
        let hash = 0;
        for(let i = 0; i < str.length; ++i) {
            let chr = str.charCodeAt(i);
            hash += chr;
            hash *= 17;
            hash = hash % 256;
        }

        sum += hash;
    }

    return sum;
}


console.log(doIt(input));

