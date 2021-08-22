const router = require('express').Router();
const Result = require('../models/result');
const ResultsFunctions = require('./utils/resultsFunctions');

router.get('/store/:storeid/division/:divisionid/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Result.getResultsByStoreDivisionSeason({
            store_id: req.params.storeid,
            division_id: req.params.divisionid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(ResultsFunctions.formatResults(data[1][3])) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/store/:storeid/division/:divisionid/seasons-list', async (req, res, next) => {
    try {
        const data = await Result.getSeasonsList({
            store_id: req.params.storeid,
            division_id: req.params.divisionid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/mongo-convert', async (req, res, next) => {
    try {
        const [data, error] = await Result.getAllResults();
        data ? res.json(ResultsFunctions.formatResults(data)) : next(error);
        // data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
