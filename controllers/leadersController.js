const router = require('express').Router();
const Leader = require('../models/leader');
const Messages = require('./addons/messages');
// const HandleErrors = require('./addons/handleErrors');

router.get('/individual/average', async (req, res) => {
    try {
        const data = await Leader.getIndividualAverage();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

router.get('/individual/one-game', async (req, res) => {
    try {
        const data = await Leader.getIndividualOneGame();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

router.get('/individual/ten-game', async (req, res) => {
    try {
        const data = await Leader.getIndividualTenGame();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

router.get('/team/average', async (req, res) => {
    try {
        const data = await Leader.getTeamAverage();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

router.get('/team/one-game', async (req, res) => {
    try {
        const data = await Leader.getTeamOneGame();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

router.get('/team/ten-game', async (req, res) => {
    try {
        const data = await Leader.getTeamTenGame();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

module.exports = router;
