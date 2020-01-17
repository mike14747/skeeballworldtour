const router = require('express').Router();
const Team = require('../models/team');
const Player = require('../models/player');

router.get('/:teamid/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Team.getTeamStatsByTeamSeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:teamid/seasons-list', async (req, res) => {
    try {
        const data = await Team.getSeasonsListByTeamId(Number(req.params.teamid));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed.. please check your request and try again!');
    }
});

router.get('/:teamid/store-name', async (req, res) => {
    try {
        const data = await Team.getTeamNameAndStoreName(req.params.teamid);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:teamid/in-schedule/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Team.getTeamInScheduleBySeason(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:teamid/current-schedule/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Team.getTeamScheduleBySeason(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:teamid/results/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Team.getTeamResultsBySeason(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:teamid/players/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Player.getPlayersOnTeamInSeason(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
