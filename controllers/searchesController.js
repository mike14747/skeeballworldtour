const router = require('express').Router();
const Player = require('../models/player');
const Team = require('../models/team');

router.get('/players/:criteria', async (req, res, next) => {
    try {
        const data = await Player.searchPlayers({
            criteria: req.params.criteria,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/teams/:criteria', async (req, res, next) => {
    try {
        const data = await Team.searchTeams({
            criteria: req.params.criteria,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
