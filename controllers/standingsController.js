const router = require('express').Router();
const Standing = require('../models/standing');
const StandingsFunctions = require('./utils/standingsFunctions');

router.get('/season/:id', async (req, res, next) => {
    try {
        const data = await Standing.getStandingsBySeasonId({
            id: Number(req.params.id),
        });
        data[0] ? res.json(StandingsFunctions.groupStandings(data[1])) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/seasons-list', async (req, res, next) => {
    try {
        const data = await Standing.getSeasonsList();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
