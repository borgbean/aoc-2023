let input = ``;


function doIt(input) {
    input = input.split('\n');

    let h = input.length;
    let w = input[0].length;

    let emptyColumns = new Set(input[0].split('').map((x, idx) => idx));
    let emptyRows = new Set();

    let galaxies = []

    for(let i = 0; i < h; ++i) {
        emptyRows.add(i);
        for(let j = 0; j < w; ++j) {
            if(input[i][j] === '#') {
                //it would make more sense to take care of the gaps here rather than later... but working on a timeline (:
                emptyColumns.delete(j);
                emptyRows.delete(i);
                galaxies.push([i, j]);
            }
        }
    }

    emptyRows = [...emptyRows.values()];
    emptyColumns = [...emptyColumns.values()];

    let sum = 0n;
    for(let i = 0; i < galaxies.length; ++i) {
        let v1 = galaxies[i];
        for(let j = i + 1; j < galaxies.length; ++j) {
            let v2 = galaxies[j];
            sum += distBetween(v1, v2, emptyRows, emptyColumns);
        }
    }


    return sum;

}

function distBetween(v1, v2, emptyRows, emptyColumns) {
    let dist = Math.abs(v2[0] - v1[0])
                + Math.abs(v2[1] - v1[1]);
    dist = BigInt(dist);
    dist += gapsBetween(Math.min(v1[0], v2[0]), Math.max(v1[0], v2[0]), emptyRows);
    dist += gapsBetween(Math.min(v1[1], v2[1]), Math.max(v1[1], v2[1]), emptyColumns);

    return dist;
}

function gapsBetween(a, b, gaps) {
    return BigInt(binarySearch(gaps, b) - binarySearch(gaps, a))*(1000000n-1n);
}

function binarySearch(list, target) {
    let l = 0, r = list.length;

    while(l < r) {
        let mid = (l+r)>>>1;

        if(list[mid] < target) {
            l = mid + 1;
        } else if(list[mid] > target) {
            r = mid;
        } else {
            return mid;
        }
    }

    return l;
}


console.log(doIt(input));

