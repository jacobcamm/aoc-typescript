const fs = require('fs');
const readline = require('readline');

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
            if (currentTotal > top3[2]) {
                top3.push(currentTotal)
                top3.sort((n1, n2) => n2 - n1)
                top3 = top3.slice(0, 3)
                console.log(top3)
            }
            currentTotal = 0
        }
        else {
            currentTotal += parseInt(line)
        }
    }
    if (currentTotal > top3[2]) {
        top3.push(currentTotal)
        top3.sort((n1, n2) => n2 - n1)
        top3 = top3.slice(0, 2)
    }

    console.log(top3.reduce((a, b) => a + b, 0))
}

run()
