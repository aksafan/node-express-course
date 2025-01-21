const fs = require("fs");

const readStream = fs.createReadStream("../content/big.txt", {
    encoding: "utf8",
    highWaterMark: 1200,
});

let counter = 0;
readStream.on("data", (result) => {
    counter++;
    console.log("event result is: ", result);
});
readStream.on("end", () => {
    console.log("Total amount of chunks is: ", counter);
});
readStream.on("error", (err) => {
    console.log("err is: ", err);
});