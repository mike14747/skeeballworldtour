const router = require('express').Router();
const db = require('../models/index');

router.get('/standings/:id', async (req, res) => {
    try {
        const data = await db.Standing.getStandingsBySeasonId(Number(req.params.id));
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings', async (req, res) => {
    try {
        const data = await db.Setting.getAllSettings();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings/navbar', async (req, res) => {
    try {
        const data = await db.Setting.getNavbarSettings();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings/homepage', async (req, res) => {
    try {
        const data = await db.Setting.getHomepageSettings();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/schedule/navbar/:id', async (req, res) => {
    try {
        const data = await db.Schedule.getCurrentStoresDivisions(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/settings/current-season', async (req, res) => {
    try {
        const data = await db.Setting.getCurrentSeasonId();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/rules', async (req, res) => {
    try {
        const data = await db.StoreText.getRules();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/homepage-news', async (req, res) => {
    try {
        const data = await db.StoreText.getHomepageNews();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/teams/:teamid/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await db.Team.getTeamStatsByTeamSeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/search/players/:criteria', async (req, res) => {
    try {
        const data = await db.Player.searchPlayers(req.params.criteria);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/search/teams/:criteria', async (req, res) => {
    try {
        const data = await db.Team.searchTeams(req.params.criteria);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/cur_store_division/:cur_season', (req, res) => {
    db.Schedule.getCurrentStoreDivision(req.params.cur_season, (data) => {
        res.json(data);
    });
});

module.exports = router;
