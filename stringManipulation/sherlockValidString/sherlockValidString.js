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

function isSame(map) {
    let same;

    // get the first element
    for (let value of map.values()) {
        same = value;
        break;
    }
    for (let value of map.values()) {
        if (value !== same && value !== 0) {
            return false;
        }
    }
    return true;
}

// Complete the isValid function below.
function isValid(s) {
    //console.log(s.split('').sort());
    //populate the map
    let charMap = new Map();
    for (let i = 0; i < s.length; i++) {
        if (!charMap.has(s[i])) {
            charMap.set(s[i], 1);
        }
        else {
            charMap.set(s[i], charMap.get(s[i]) + 1);
        }
    }

    // test case all true
    if (isSame(charMap)) {
        return 'YES';
    }
    // test each one with one char removed
    for (let [key, value] of charMap) {
        charMap.set(key, charMap.get(key) - 1);
        if (isSame(charMap)) {
            return 'YES';
        }
        charMap.set(key, charMap.get(key) + 1);
    }

    return 'NO';

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
