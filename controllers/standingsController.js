const router = require('express').Router();
const Standing = require('../models/standing');

router.get('/season/:id', async (req, res) => {
    try {
        const data = await Standing.getStandingsBySeasonId(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/seasons-list', async (req, res) => {
    try {
        const data = await Standing.getSeasonsList();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
