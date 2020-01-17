const router = require('express').Router();
const Result = require('../models/result');

router.get('/store/:storeid/division/:divisionid/season/:seasonid', async (req, res) => {
    const paramsObj = {
        store_id: req.params.storeid,
        division_id: req.params.divisionid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Result.getResultsByStoreDivisionSeason(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/store/:storeid/division/:divisionid/seasons-list', async (req, res) => {
    const paramsObj = {
        store_id: req.params.storeid,
        division_id: req.params.divisionid,
    };
    try {
        const data = await Result.getSeasonsList(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
