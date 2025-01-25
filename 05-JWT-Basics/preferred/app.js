require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const usersRouter = require('./routes/users');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const path = require("path");

app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.end(path.parse("./public/index.html"));
});

app.use('/api/v1', usersRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
