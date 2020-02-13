const router = require('express').Router();
const Player = require('../models/player');

router.get('/:playerid/results/seasons/:seasonid', async (req, res, next) => {
    try {
        const data = await Player.getPlayerResultsByPlayerSeasonId({
            player_id: req.params.playerid,
            season_id: req.params.seasonid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:playerid/name-store', async (req, res, next) => {
    try {
        const data = await Player.getPlayerNameAndStore({
            id: req.params.playerid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:playerid/seasons-list', async (req, res, next) => {
    try {
        const data = await Player.getSeasonsListByPlayerId({
            id: req.params.playerid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
