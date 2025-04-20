const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
require("dotenv").config()
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Task Manager App');
})

app.use('/api/v1/tasks/', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_CONNECTING_STRING);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (e) {
        console.log(e);
    }
}

start();
