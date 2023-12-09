let input = ``;

function doIt(input) {
    input = input.split('\n');
    
    let sum = 0;
    for(let line of input) {
        line = line.split(' ').map(Number);

        let lineStarts = [];
        for(let len = line.length; len > 0; --len) {
            lineStarts.push(line[0]);

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
        for(let i = lineStarts.length-1; i >= 0; --i) {
            extraNum = lineStarts[i] - extraNum;
        }

        sum += extraNum;

    }

    return sum;
}



console.log(doIt(input));
