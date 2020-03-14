const router = require('express').Router();
const Team = require('../models/team');
const Player = require('../models/player');
const ResultsFunctions = require('./utils/resultsFunctions');

router.get('/:teamid/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Team.getTeamStatsByTeamSeasonId({
            team_id: req.params.teamid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/seasons-list', async (req, res, next) => {
    try {
        const data = await Team.getSeasonsListByTeamId({
            team_id: req.params.teamid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/store-name', async (req, res, next) => {
    try {
        const data = await Team.getTeamNameAndStoreName({
            team_id: req.params.teamid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/current-stores/season/:seasonid', async (req, res, next) => {
    try {
        const data = await Team.getCurrentStores({
            team_id: req.params.teamid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/in-schedule/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Team.getTeamInScheduleBySeason({
            team_id: req.params.teamid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/current-schedule/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Team.getTeamScheduleBySeason({
            team_id: req.params.teamid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/results/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Team.getTeamResultsBySeason({
            team_id: req.params.teamid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(ResultsFunctions.formatResults(data[1][2])) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid/players/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Player.getPlayersOnTeamInSeason({
            team_id: req.params.teamid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
