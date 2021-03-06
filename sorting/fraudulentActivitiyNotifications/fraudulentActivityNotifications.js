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

    // Number of notifications
    let notify = 0;

    // Set midpoints for median calculation
    let [i1, i2] = [Math.floor((d - 1) / 2), Math.ceil((d - 1) / 2)];
    let m1, m2, m;

    // Initialize count sorted subarray
    let frequency = new Array(200).fill(0);
    for (let i = d - 1; i >= 0; i--) {
        frequency[expenditure[i]]++;
    }

    // Iterate through expenditures
    for (let i = d, l = expenditure.length; i < l; i++) {

        // Find median
        for (let j = 0, k = 0; k <= i1; k += frequency[j], j++) {
            m1 = j;
        }
        for (let j = 0, k = 0; k <= i2; k += frequency[j], j++) {
            m2 = j;
        }
        m = (m1 + m2) / 2;

        // Check if notification is given
        if (expenditure[i] >= m * 2) {
            notify++;
        }

        // Replace subarray elements
        frequency[expenditure[i - d]]--;
        frequency[expenditure[i]]++;
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
