const router = require('express').Router();

const mainController = require('./mainController');
router.use('/', mainController);

const storeController = require('./storeController');
router.use('/', storeController);

module.exports = router;
