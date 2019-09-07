const router = require('express').Router();
const path = require('path');
const mainController = require('./mainController');
const storeController = require('./storeController');

router.use('/', mainController);
router.use('/', storeController);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
