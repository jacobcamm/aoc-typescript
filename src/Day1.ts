const fs = require('fs');
const readline = require('readline');

function sort(newVal: number, prevTop: number[]) {
    if (newVal > prevTop[2]) {
        prevTop.push(newVal)
        prevTop.sort((n1, n2) => n2 - n1)
        return prevTop.slice(0, 3)
    }
    return prevTop
}

const run = async () => {
    const fileStream = fs.createReadStream('Day1.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let currentTotal: number = 0
    let top3: number[] = [0, 0, 0]
    for await (const line of rl) {
        if (!line) {
            top3 = sort(currentTotal, top3)
            currentTotal = 0
        }
        else {
            currentTotal += parseInt(line)
        }
    }
    top3 = sort(currentTotal, top3)

    console.log(top3.reduce((a, b) => a + b, 0))
}

run()
