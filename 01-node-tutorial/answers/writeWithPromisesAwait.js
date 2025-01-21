const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        await writeFile('./temporary/temp.txt', 'testData1\n', {flag: 'a'});
        await writeFile('./temporary/temp.txt', 'testData2\n', {flag: 'a'});
        await writeFile('./temporary/temp.txt', 'testData3\n', {flag: 'a'});
    } catch (e) {
        console.log(e);
    }
}

const reader = async () => {
    try {
        const result = await readFile('./temporary/temp.txt', {encoding: 'utf8'});
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}

const readWrite = async () => {
    await writer();
    await reader();
}

readWrite();