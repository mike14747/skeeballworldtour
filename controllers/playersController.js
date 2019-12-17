const router = require('express').Router();
const Player = require('../models/player');

router.get('/:playerid/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        player_id: req.params.playerid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Player.getPlayerStatsByPlayerSeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
