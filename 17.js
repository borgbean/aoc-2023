let input = ``;

function doIt(input) {
    input = input.split('\n');
    
    let sum = 0;
    for(let line of input) {
        line = line.split(' ').map(Number);

        let lineEnds = [];
        for(let len = line.length; len > 0; --len) {
            lineEnds.push(line[len-1]);

            let nonZeroFound = false;
            for(let i = 1; i < len; ++i) {
                let diff = line[i] - line[i-1];
                line[i-1] = diff;
                nonZeroFound ||= diff !== 0;
            }
            if(!nonZeroFound) {
                break;
            }
        }
        let extraNum = 0;
        for(let i = lineEnds.length-1; i >= 0; --i) {
            extraNum = lineEnds[i] + extraNum;
        }

        sum += extraNum;

    }

    return sum;
}



console.log(doIt(input));
