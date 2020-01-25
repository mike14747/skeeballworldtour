const router = require('express').Router();
const Leader = require('../models/leader');
const msg = require('./addons/messages');

router.get('/individual/average/:seasonid/:numleaders', async (req, res) => {
    const paramsObj = {
        season_id: Number(req.params.seasonid),
        num_leaders: Number(req.params.numleaders),
    };
    try {
        const data = await Leader.getIndividualAverageBySeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

router.get('/individual/one-game/:seasonid/:numleaders', async (req, res) => {
    const paramsObj = {
        season_id: Number(req.params.seasonid),
        num_leaders: Number(req.params.numleaders),
    };
    try {
        const data = await Leader.getIndividualOneGameBySeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

router.get('/individual/ten-game/:seasonid/:numleaders', async (req, res) => {
    const paramsObj = {
        season_id: Number(req.params.seasonid),
        num_leaders: Number(req.params.numleaders),
    };
    try {
        const data = await Leader.getIndividualTenGameBySeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

router.get('/team/average/:seasonid/:numleaders', async (req, res) => {
    const paramsObj = {
        season_id: Number(req.params.seasonid),
        num_leaders: Number(req.params.numleaders),
    };
    try {
        const data = await Leader.getTeamAverageBySeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

router.get('/team/one-game/:seasonid/:numleaders', async (req, res) => {
    const paramsObj = {
        season_id: Number(req.params.seasonid),
        num_leaders: Number(req.params.numleaders),
    };
    try {
        const data = await Leader.getTeamOneGameBySeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

router.get('/team/ten-game/:seasonid/:numleaders', async (req, res) => {
    const paramsObj = {
        season_id: Number(req.params.seasonid),
        num_leaders: Number(req.params.numleaders),
    };
    try {
        const data = await Leader.getTeamTenGameBySeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

module.exports = router;
