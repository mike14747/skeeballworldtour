const router = require('express').Router();
const Leader = require('../models/leader');

router.get('/individual/average/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverageBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/one-game/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualOneGameBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/ten-game/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualTenGameBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/average/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getTeamAverageBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/one-game/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getTeamOneGameBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/ten-game/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getTeamTenGameBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
