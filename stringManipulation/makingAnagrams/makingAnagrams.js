'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
    let firstStrMap = new Map();
    let secondStrMap = new Map();

    for (let i = 0; i < a.length; i++) {
        if (!firstStrMap.has(a[i])) {
            firstStrMap.set(a[i], 1);
        }
        else {
            firstStrMap.set(a[i], firstStrMap.get(a[i]) + 1);
        }
    }
    for (let i = 0; i < b.length; i++) {
        if (!secondStrMap.has(b[i])) {
            secondStrMap.set(b[i], 1);
        }
        else {
            secondStrMap.set(b[i], secondStrMap.get(b[i]) + 1);
        }
    }

    let result = 0;
    for (let [key, value] of firstStrMap) {
        result += Math.abs(value - (secondStrMap.get(key) || 0))
    }
    for (let [key, value] of secondStrMap) {
        if(!firstStrMap.has(key)) {
            result += value;
            //result += Math.abs(value - firstStrMap.get(key));
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
