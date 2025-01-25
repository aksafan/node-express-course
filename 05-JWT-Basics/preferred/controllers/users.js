require('dotenv').config();
const jwt = require('jsonwebtoken');

const hello = async (req, res) => {
    res.status(200).json({message: req.user.name});
};

const logon = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(401).json({message: 'No valid username or password'});
    }
    const token = jwt.sign(
        {data: username},
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.status(200).json({token});
};

module.exports = {
    logon,
    hello,
};
