const { writeFile, readFile } = require("fs").promises;

writeFile('./temporary/temp.txt', 'testData1\n', {flag: 'a'})
    .then(() => {
        return writeFile('./temporary/temp.txt', 'testData2\n', {flag: 'a'});
    })
    .then(() => {
        return writeFile('./temporary/temp.txt', 'testData3\n', {flag: 'a'});
    })
    .then(() => {
        return readFile('./temporary/temp.txt', {encoding: 'utf8'});
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log("An error occurred: ", error)
    })
