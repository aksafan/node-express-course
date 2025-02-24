const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await Product.find({
        price: {$gt: 30}
    })
        .select(['name', 'price'])
        .limit(10)
        .skip(5)

    res.status(200).json({products, nbHits: products.length});
};

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true';
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }

    if (numericFilters) {
        try {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<=)\b/g;
            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            );
            const options = ['price', 'rating'];
            filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field) && !isNaN(value)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            });
        } catch (error) {
            return res.status(400).json({ msg: 'Invalid numeric filter format' });
        }
    }

    let result = Product.find(queryObject).lean();

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList)
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)

    const products = await result;

    res.status(200).json({products, nbHits: products.length});
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
