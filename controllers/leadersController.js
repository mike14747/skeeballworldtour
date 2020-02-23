const router = require('express').Router();
const Leader = require('../models/leader');

router.get('/individual/average/:seasonid/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverageBySeasonId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/average/:seasonid/:numleaders/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverageBySeasonStoreDivisionId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/one-game/:seasonid/:numleaders/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualOneGameBySeasonStoreDivisionId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/ten-game/:seasonid/:numleaders/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualTenGameBySeasonStoreDivisionId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/average/:seasonid/:numleaders/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamAverageBySeasonStoreDivisionId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/one-game/:seasonid/:numleaders/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamOneGameBySeasonStoreDivisionId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/ten-game/:seasonid/:numleaders/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamTenGameBySeasonStoreDivisionId({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/seasons-list', async (req, res, next) => {
    try {
        const data = await Leader.getSeasonsList();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
