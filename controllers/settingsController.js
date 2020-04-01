const router = require('express').Router();
const Setting = require('../models/setting');

router.get('/', async (req, res, next) => {
    try {
        const data = await Setting.getAllSettings();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
