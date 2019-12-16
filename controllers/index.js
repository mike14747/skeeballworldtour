const router = require('express').Router();

const mainController = require('./mainController');
router.use('/', mainController);

const storesController = require('./storesController');
router.use('/', storesController);

const settingsController = require('./settingsController');
router.use('/', settingsController);

module.exports = router;
