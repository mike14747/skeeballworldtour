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

router.get('/navbar', async (req, res, next) => {
    try {
        const data = await Setting.getNavbarSettings();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/homepage', async (req, res, next) => {
    try {
        const data = await Setting.getHomepageSettings();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/current-season', async (req, res, next) => {
    try {
        const data = await Setting.getCurrentSeasonId();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
