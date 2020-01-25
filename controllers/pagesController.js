const router = require('express').Router();
const Page = require('../models/page');
const msg = require('./addons/messages');

router.get('/rules', async (req, res) => {
    try {
        const data = await Page.getRules();
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

router.get('/homepage-news', async (req, res) => {
    try {
        const data = await Page.getHomepageNews();
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

module.exports = router;
