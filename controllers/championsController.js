const router = require('express').Router();
const Champion = require('../models/champion');
const Messages = require('./addons/messages');

router.get('/', async (req, res) => {
    try {
        const data = await Champion.getAllChampions();
        res.json(data);
    } catch (err) {
        console.log(Messages.consoleLogErrorMessage + err);
        res.status(Messages.errorStatusCode).send(Messages.errorResponseText);
    }
});

module.exports = router;
