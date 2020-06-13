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

function findMedian(arr, d) {
    //const isOdd = d % 2 === 1;
    const isEven = d % 2 === 0;
    const mid = Math.ceil(d / 2);
    console.log('mid: ', mid);
    let sum = 0;
    let median = null;

    for (let i = 0; i < arr.length; i++) {
        // if a value exists increase sum
        if (arr[i] > 0) {
            console.log('arr[i]: ', arr[i]);
            sum += arr[i];
            console.log('sum: ', sum);

            if (isEven && sum === mid) {
                median = i;
            }
            else if (sum >= mid) {
                return median = median ? (median + i) / 2 : i;
            }
        }
    }
}

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
    // initialize a frequency table to zeros
    const frequency = new Array(200).fill(0);

    // increment the first d elements
    for (let i = 0; i < d; i++) {
        frequency[expenditure[i]] += 1;
    }

    let notify = 0;
    let median = 0;

    for (let i = d; i < expenditure.length; i++) {
        median = findMedian(frequency, d);
        console.log('median: ', median);
        if (expenditure[i] >= median * 2) {
            notify++;
        }

        // remove the oldest spending and add the newest
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
