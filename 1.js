let input = ``;
let zeroCode = '0'.charCodeAt(0);
let sum = 0;

for(let i = 0; i < input.length; ++i) {
    let first = -1;
    let last = -1;
    while(i < input.length && input[i] !== '\n') {
        let digit = input.charCodeAt(i)-zeroCode;
        if(digit < 10 && digit >= 0) {
            last = digit;
            if(first < 0) {
                first = digit;
            }
        }

        i++;
    }

    if(first < 0) {
        throw new Error('nope');
    }

    sum += (first*10) + last;


}

console.log(sum);