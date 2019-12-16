const router = require('express').Router();
const Setting = require('../models/setting');

router.get('/settings', async (req, res) => {
    try {
        const data = await Setting.getAllSettings();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings/navbar', async (req, res) => {
    try {
        const data = await Setting.getNavbarSettings();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings/homepage', async (req, res) => {
    try {
        const data = await Setting.getHomepageSettings();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings/current-season', async (req, res) => {
    try {
        const data = await Setting.getCurrentSeasonId();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
