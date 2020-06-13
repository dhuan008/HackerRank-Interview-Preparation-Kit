'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
    let notify = 0;
    let median = 0;
    let prevSpending = 0;
    const isOdd = d % 2 === 1;

    for (let i = d; i < expenditure.length; i++) {
        // need a sorted subset here
        prevSpending = expenditure.slice(i - d, i).sort((a, b) => a - b);
        if (isOdd) {
            median = prevSpending[Math.ceil(d / 2) - 1];
        }
        else {
            median = (prevSpending[d / 2] + prevSpending[d / 2 - 1]) / 2;
        }

        console.log(expenditure);
        console.log(prevSpending);
        console.log(median);

        if (expenditure[i] >= median * 2) {
            notify++;
        }
    }

    return notify;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}
