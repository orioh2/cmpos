var express = require('express');
var router = express.Router();
require("./db")

router.use(require('./api_auth'));
router.use(require('./api_product'));
router.use(require('./api_transaction'));
router.use(require('./api_feedback'))

module.exports = router;