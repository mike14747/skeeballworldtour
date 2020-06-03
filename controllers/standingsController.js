const router = require('express').Router();
const Standing = require('../models/standing');
const { groupStandings } = require('./utils/standingsFunctions');

router.get('/seasons/:seasonid', async (req, res, next) => {
    const paramsObj = {
        season_id: parseInt(req.params.seasonid),
    };
    try {
        const data = await Standing.getStandingsBySeasonId(paramsObj);
        data[0] ? res.json(groupStandings(data[0])) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/seasons-list', async (req, res, next) => {
    try {
        const data = await Standing.getSeasonsList();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/stores/:storeid/divisions/:divisionid/seasons/:seasonid', async (req, res, next) => {
    const paramsObj = {
        store_id: req.params.storeid,
        division_id: req.params.divisionid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Standing.getStandingsByStoreDivisionSeasonIds(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
