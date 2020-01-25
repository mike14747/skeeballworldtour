const router = require('express').Router();
const Champion = require('../models/champion');
const msg = require('./addons/messages');

router.get('/', async (req, res) => {
    try {
        const data = await Champion.getAllChampions();
        res.json(data);
    } catch (err) {
        console.log(msg.consoleLogErrorMessage + err);
        res.status(msg.errorStatusCode).send(msg.errorResponseText);
    }
});

module.exports = router;
