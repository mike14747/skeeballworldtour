const router = require('express').Router();
const Schedule = require('../models/schedule');
const { formatScheduleArray, convertSchedulesForMongo } = require('./utils/schedulesFunctions');

router.get('/navbar/:id', async (req, res, next) => {
    try {
        const data = await Schedule.getCurrentStoresDivisions({
            id: req.params.id,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/store/:storeid/division/:divisionid/seasons-list', async (req, res, next) => {
    try {
        const data = await Schedule.getSeasonsList({
            store_id: req.params.storeid,
            division_id: req.params.divisionid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/store/:storeid/division/:divisionid/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Schedule.getSchedulesByStoreDivisionSeason({
            store_id: req.params.storeid,
            division_id: req.params.divisionid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(formatScheduleArray(data[1])) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/mongo-convert', async (req, res, next) => {
    try {
        const [data, error] = await Schedule.getSchedulesForMongo();
        data ? res.json(convertSchedulesForMongo(data)) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
