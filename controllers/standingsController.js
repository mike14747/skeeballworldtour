const router = require('express').Router();
const Standing = require('../models/standing');
const { groupStandings } = require('./utils/standingsFunctions');

router.get('/seasons/:seasonid([0-9]+)', async (req, res, next) => {
    const paramsObj = {
        seasonId: parseInt(req.params.seasonid),
    };
    try {
        const [data, error] = await Standing.getStandingsBySeasonId(paramsObj);
        data ? res.json(groupStandings(data)) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/seasons-list', async (req, res, next) => {
    try {
        const [data, error]  = await Standing.getSeasonsList();
        data ? res.json(data) : next(error);
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
        const [data, error]  = await Standing.getStandingsByStoreDivisionSeasonIds(paramsObj);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
