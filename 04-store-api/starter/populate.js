require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

// Seeding
const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_CONNECTING_STRING);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Database Seeded Successfully');
        process.exit(0);
    } catch (e) {
        console.error('Error seeding database:', e.message);
        console.error(e.stack);
        process.exit(1);
    }
}

start();
