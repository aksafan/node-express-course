const fs = require('fs');

fs.writeFileSync('./temporary/fileA.txt', 'testData', {flag: 'a'});
console.log(fs.readFileSync('./temporary/fileA.txt', {encoding: 'utf8'}));
