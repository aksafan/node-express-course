const express = require("express");
const path = require("path");
const {products, people} = require("./data");
const {filterName, filterDescription, filterPrice} = require("./utils/filters");
const peopleRouter = require("./routes/people")
const cookieParser = require("cookie-parser")

const app = express();

const logger = (req, res, next) => {
    console.log(`Http method is: ${req.method}, url is: ${req.url}`);
    next();
};

const auth = (req, res, next) => {
    const name = req.cookies.name;
    if (!name) {
        res.status(401).json({success: false, message: "Unauthorized"});
    } else {
        req.user = name;

        next();
    }
};

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use('/api/v1/people', peopleRouter);

app.post('/logon', (req, res) => {
    const {name} = req.body;

    if (!name) {
        res.status(400).json({success: false, message: "Please provide a name"});
    } else {
        res.cookie("name", req.body.name)

        res.status(201).json({success: true, message: `Hello ${name}`});
    }
});

app.delete('/logoff', (req, res) => {
    res.clearCookie("name")

    res.status(200).json({success: true, message: `User was logged off`});
});

app.get('/test', auth, (req, res) => {
    res.status(200).json({success: true, message: `Welcome ${req.user}`});
});

app.get('/api/v1/test', (req, res) => {
    res.status(200);
    res.json({message: "It worked!"});
});

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
    if (!product) {
        res.status(404).json({message: "That product was not found."})
    } else {
        res.status(200).json({product});
    }
});

// Example http://localhost:3000/api/v1/query?name=al&description=I%27m%20baby%20&price=[gt]=10.99&limit=5
app.get('/api/v1/query', (req, res) => {
    const {name, description, limit, "price=": price} = req.query;

    let productsToReturn = [...products];
    productsToReturn = filterName(name, productsToReturn);
    productsToReturn = filterDescription(description, productsToReturn);
    productsToReturn = filterPrice(price, productsToReturn);

    if (productsToReturn.length === 0) {
        res.status(404).json({message: "No products were found."})
    } else {
        res.status(200).json({
            "products": productsToReturn.slice(0, limit ?? productsToReturn.length)
        });
    }
});

app.get('/api/v1/products', (req, res) => {
    res.status(200);
    res.json({message: products});
});

app.get('/', (req, res) => {
    res.status(200);
    res.end(path.parse("./public/index.html"));
});

app.all('*', (req, res) => {
    res.status(404);
    res.end("Not found");
});

app.listen(3000);