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

router.get('/:teamid/seasons', async (req, res) => {
    try {
        const data = await Team.getTeamBySeasons(req.params.teamid);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
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

router.get('/:teamid/schedules/seasons/:seasonid', async (req, res) => {
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
