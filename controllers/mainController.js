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

router.get('/settings/current-season', async (req, res) => {
    try {
        const data = await db.Setting.getCurrentSeasonId();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/homepage_news', (req, res) => {
    db.StoreText.selectHomepageNews((data) => {
        res.json(data);
    });
});

router.get('/rules', (req, res) => {
    db.StoreText.selectRules((data) => {
        res.json(data);
    });
});

router.get('/search/players/:criteria', (req, res) => {
    db.Player.searchPlayers(req.params.criteria, (data) => {
        res.json(data);
    });
});

router.get('/search/teams/:criteria', (req, res) => {
    db.Team.searchTeams(req.params.criteria, (data) => {
        res.json(data);
    });
});

router.get('/cur_store_division/:cur_season', (req, res) => {
    db.Schedule.getCurrentStoreDivision(req.params.cur_season, (data) => {
        res.json(data);
    });
});

module.exports = router;
