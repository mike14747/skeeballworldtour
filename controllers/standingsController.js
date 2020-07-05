const router = require('express').Router();
const Standing = require('../models/standing');
const { groupStandings } = require('./utils/standingsFunctions');

router.get('/seasons/:seasonid([0-9]+)', async (req, res, next) => {
    const paramsObj = {
        seasonId: parseInt(req.params.seasonid),
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

router.get('/stores/:storeid([0-9]+)/divisions/:divisionid([0-9]+)/seasons/:seasonid([0-9]+)', async (req, res, next) => {
    const paramsObj = {
        storeId: parseInt(req.params.storeid),
        divisionId: parseInt(req.params.divisionid),
        seasonId: parseInt(req.params.seasonid),
    };
    try {
        const data = await Standing.getStandingsByStoreDivisionSeasonIds(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
