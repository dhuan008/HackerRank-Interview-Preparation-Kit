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

// Complete the substrCount function below.
function substrCount(n, s) {
    let count = n;

    let temp = s.match(/([a-z])\1+/g);

    let triangular = (x) => {
        return (x * x + x) / 2;
    };

    if (temp != null) {
        temp.forEach((item, index) => {
            count += triangular(item.length - 1);
        });

    }

    temp = s.match(/(([a-z])\2*)(?!\1)(?=[a-z]\1)/g);

    if (temp != null) {
        temp.forEach((item, index) => {
            count += (item.length);
        });

    }

    return count;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
