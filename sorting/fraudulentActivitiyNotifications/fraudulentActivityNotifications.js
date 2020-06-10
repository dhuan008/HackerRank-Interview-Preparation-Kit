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
    expenditure.sort((a, b) => {return a - b});
    let notify = 0;
    let medianPos = 0;

    if (d % 2 === 1) { // if odd
        medianPos = Math.ceil(d / 2);
    }
    else {
        medianPos = d / 2;
    }

    for (let i = d; i < expenditure.length; i++ ) {
        // Greater than || equal median notify++
        let median = 0;
        if (d % 2 === 1) {
            median = expenditure[i-Math.ceil(d / 2)];
        }
        else {
            median = (expenditure(i - d / 2) + expenditure( i - (d / 2 - 1))) / 2;
        }

        if (median >= expenditure[i]) {
            notify++;
        }
    }

    console.log(notify);

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
