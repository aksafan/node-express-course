const express = require('express')
const authorizationMiddleware = require('./../middleware/authorization');
const router = express.Router()

const {
    logon,
    hello,
} = require('../controllers/users');

router.route('/logon').post(logon);
router.route('/hello').get(authorizationMiddleware, hello);

module.exports = router;
