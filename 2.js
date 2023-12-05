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
        } else {
            digit = -1;
            if(input.substring(i, i+4) === 'zero') {
                digit = 0;
            } else if(input.substring(i, i+3) === 'one') {
                digit = 1;
            } else if(input.substring(i, i+3) === 'two') {
                digit = 2;
            } else if(input.substring(i, i+5) === 'three') {
                digit = 3;
            } else if(input.substring(i, i+4) === 'four') {
                digit = 4;
            } else if(input.substring(i, i+4) === 'five') {
                digit = 5;
            } else if(input.substring(i, i+3) === 'six') {
                digit = 6;
            } else if(input.substring(i, i+5) === 'seven') {
                digit = 7;
            } else if(input.substring(i, i+5) === 'eight') {
                digit = 8;
            } else if(input.substring(i, i+4) === 'nine') {
                digit = 9;
            }

            if(digit > -1) {
                last = digit;
                if(first < 0) {
                    first = digit;
                }
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