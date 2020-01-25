const router = require('express').Router();
const Page = require('../models/page');
const Messages = require('./addons/messages');

router.get('/rules', async (req, res) => {
    try {
        const data = await Page.getRules();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

router.get('/homepage-news', async (req, res) => {
    try {
        const data = await Page.getHomepageNews();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

module.exports = router;
