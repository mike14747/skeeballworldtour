const router = require('express').Router();
const Player = require('../../models/player');

router.get('/', async (req, res, next) => {
    try {
        const data = await Player.getAllPlayers();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:playerid', async (req, res, next) => {
    const paramsObj = {
        player_id: req.params.playerid,
    };
    try {
        const data = await Player.getPlayerById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        player_name: req.body.player_name,
    };
    try {
        const data = await Player.addNewPlayer(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        player_id: req.body.player_id,
        player_name: req.body.player_name,
    };
    try {
        const data = await Player.updatePlayerById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/:playerid', async (req, res, next) => {
    const paramsObj = {
        player_id: req.params.playerid,
    };
    try {
        const data = await Player.deletePlayerById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
