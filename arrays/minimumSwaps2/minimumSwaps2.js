'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function swapsFunction(arr, index) {
    let swaps = 0;

    let current = arr[index];
    let target = arr[current - 1];
    while (current !== target) {
        arr[index] = target;
        arr[current - 1] = current;

        swaps++;

        current = target;
        target = arr[current - 1];
    }

    return swaps;
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let totalSwaps = 0;
    for (let i = 0; i < arr.length; i++) {
        totalSwaps += swapsFunction(arr, i);
    }

    return totalSwaps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}