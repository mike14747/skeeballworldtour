const router = require('express').Router();
const Leader = require('../models/leader');

router.get('/individual/average/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverage({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/average/num-leaders/:numleaders/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverage({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/average/num-leaders/:numleaders/season/:seasonid/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverage({
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

router.get('/individual/one-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualOneGame({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/one-game/num-leaders/:numleaders/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualOneGame({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/one-game/num-leaders/:numleaders/season/:seasonid/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualOneGame({
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

router.get('/individual/ten-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualTenGame({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/ten-game/num-leaders/:numleaders/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualTenGame({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/ten-game/num-leaders/:numleaders/season/:seasonid/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualTenGame({
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
