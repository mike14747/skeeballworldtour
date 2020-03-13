const router = require('express').Router();
const Leader = require('../models/leader');
const LeadersFunctions = require('./utils/leadersFunctions');

router.get('/individual/average/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualAverage({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/one-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getIndividualOneGame({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/average/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getTeamAverage({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/average/num-leaders/:numleaders/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamAverage({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/average/num-leaders/:numleaders/season/:seasonid/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamAverage({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/one-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getTeamOneGame({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/one-game/num-leaders/:numleaders/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamOneGame({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/one-game/num-leaders/:numleaders/season/:seasonid/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamOneGame({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/ten-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await Leader.getTeamTenGame({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/ten-game/num-leaders/:numleaders/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamTenGame({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/team/ten-game/num-leaders/:numleaders/season/:seasonid/store/:storeid/division/:divisionid', async (req, res, next) => {
    try {
        const data = await Leader.getTeamTenGame({
            season_id: Number(req.params.seasonid),
            num_leaders: Number(req.params.numleaders),
            store_id: Number(req.params.storeid),
            division_id: Number(req.params.divisionid),
        });
        data[0] ? res.json([data[1][2], LeadersFunctions.rankLeaders(data[1][3])]) : next(data[1]);
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
