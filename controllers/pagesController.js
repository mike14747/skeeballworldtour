const router = require('express').Router();
const Page = require('../models/page');

router.get('/rules', async (req, res, next) => {
    try {
        const data = await Page.getRules();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/homepage-news', async (req, res, next) => {
    try {
        const data = await Page.getHomepageNews();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/homepage-news-mongo', async (req, res, next) => {
    try {
        const data = await Page.getHomepageNewsForMongo();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
