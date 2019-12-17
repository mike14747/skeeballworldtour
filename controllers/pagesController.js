const router = require('express').Router();
const Page = require('../models/page');

router.get('/rules', async (req, res) => {
    try {
        const data = await Page.getRules();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/homepage-news', async (req, res) => {
    try {
        const data = await Page.getHomepageNews();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
