const router = require('express').Router();
const Player = require('../models/player');
const Team = require('../models/team');

router.get('/players/:criteria', async (req, res) => {
    try {
        const data = await Player.searchPlayers(req.params.criteria);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/teams/:criteria', async (req, res) => {
    try {
        const data = await Team.searchTeams(req.params.criteria);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
