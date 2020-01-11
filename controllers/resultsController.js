const router = require('express').Router();
const Store = require('../models/store');
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

module.exports = router;
