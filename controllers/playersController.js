const router = require('express').Router();
const Player = require('../models/player');

router.get('/:playerid/results/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        player_id: req.params.playerid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Player.getPlayerResultsByPlayerSeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:playerid/name-store', async (req, res) => {
    try {
        const data = await Player.getPlayerNameAndStore(req.params.playerid);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:playerid/seasons-list', async (req, res) => {
    try {
        const data = await Player.getSeasonsListByPlayerId(req.params.playerid);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
