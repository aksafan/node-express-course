const fs = require('fs');

console.log('at start');
fs.writeFile('./temporary/fileB.txt', 'testData', (error, data) => {
    console.log('at point 1');
    if (error) {
        console.log('This error happened: ', error);
    } else {
        console.log('Data1: ', data);
        fs.writeFile('./temporary/fileB.txt', 'testData', {flag: 'a'}, (error, data) => {
            console.log('at point 2');
            if (error) {
                console.log('This error happened2: ', error);
            } else {
                console.log('Data2: ', data);
                fs.writeFile('./temporary/fileB.txt', 'testData', {flag: 'a'}, (error, data) => {
                    console.log('at point 3');
                    if (error) {
                        console.log('This error happened3: ', error);
                    } else {
                        console.log('Data3: ', data);
                    }
                });
            }
        });
    }
});
console.log('at end');
