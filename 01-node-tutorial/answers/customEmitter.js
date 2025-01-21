const EventEmitter = require("events");

const emitter = new EventEmitter();

setInterval(() => {
    emitter.emit("timer", "hi there");
}, 2000);
emitter.on("timer", (msg) => console.log(msg));

const waitForEvent = () => {
    return new Promise((resolve, reject) => {
        emitter.on("happens", (msg) => resolve(msg));
        emitter.on("error_happened", (error) => reject(error));
    });
};
const doWait = async () => {
    try {
        const msg = await waitForEvent();
        console.log("We got an event! Here it is: ", msg);
    } catch (e) {
        console.log("We got an error! Here it is: ", e);
    }
};
doWait();
emitter.emit("happens", "Hello World!");

doWait();
setTimeout(() => {
    emitter.emit("error_happened", "error message");
}, 5000);