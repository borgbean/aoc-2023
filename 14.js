let input = ``;

// HAND    BID

let cardRankList = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
let cardRanks = new Map(cardRankList.map((x, idx) => [x, (cardRankList.length-1)-idx]));

let handTypeWidth = cardRankList.length**5;
let handTypeCount = 7;

function doIt(input) {
    input = input.split('\n');
    
    //array of [handScore, bid]
    //handScore is an integer which assigns an int val to every possible hand, based on its rank.
    let resultArr = [];
    
    for(let line of input) {
        let [hand, bid] = line.split(/\s/);

        resultArr.push([(getHandRank(hand)*handTypeWidth) + getHandIntval(hand), Number(bid)]);
    }

    resultArr.sort((a, b) => a[0]-b[0]);

    let result = 0;
    for(let i = 0; i < resultArr.length; ++i) {
        result += (i+1) * resultArr[i][1];
    }
    
    return result;
    
}

function getHandIntval(hand) {
    let result = 0;
    for(let card of hand) {
        result *= cardRankList.length;
        result += cardRanks.get(card);
    }

    return result;
}

function getHandRank(hand) {
    let cardCounts = new Map();
    let jCount = 0;
    for(let i = 0; i < hand.length; ++i) {
        if(hand[i] === 'J') {
            ++jCount;
            continue;
        }
        let rank = cardRanks.get(hand[i]);
        let rankCount = cardCounts.get(rank)??0;
        cardCounts.set(rank, rankCount+1);
    }

    //five of a kind (can be all jokers!)
    if(cardCounts.size === 1 || cardCounts.size === 0) {
        //5 of a kind === 6
        return 6;
    }

    //four of a kind
    if(cardCounts.size === 2) {
        for(let count of cardCounts.values()) {
            if((jCount+count) === 4) {
                //4 of a kind === 5
                return 5;
            }
        }
    }

    //full house
    if(cardCounts.size === 2) {
        for(let count of cardCounts.values()) {
            if((count+jCount) === 3) {
                return 4;
            }
        }
    }

    //three of a kind
    if(cardCounts.size === 3) {
        for(let count of cardCounts.values()) {
            if((count+jCount) === 3) {
                return 3;
            }
        }
    }

    //two pair
    if(cardCounts.size === 3) {
        return 2;
    }
    
    //one pair
    if(cardCounts.size === 4) {
        return 1;
    }

    return 0;

}

console.log(doIt(input));
