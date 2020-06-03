'use strict';

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

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    if (note.length > magazine.length) {
        console.log('No');
        return;
    }
    else {
        let map = new Map();
        for (let i = 0; i < magazine.length; i++) {
            if (!map.has(magazine[i])) {
                map.set(magazine[i], 1)
            }
            else {
                let wordNum = map.get(magazine[i]);
                //console.log('wordnum: ', wordNum);
                map.set(magazine[i], wordNum++);
            }
        }
        //console.log(map);
        for (let i = 0; i < note.length; i++) {
            if (map.has(note[i])) {
                let wordNum = map.get(note[i]);
                map.set(note[i], wordNum - 1);
                if (map.get(note[i]) < 0) {
                    console.log('No');
                    return;
                }
            }
            else {
                console.log('No');
                return;
            }
        }
    }

    console.log('Yes');

}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}