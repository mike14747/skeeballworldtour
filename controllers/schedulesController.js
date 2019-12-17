const router = require('express').Router();
const Schedule = require('../models/schedule');

router.get('/navbar/:id', async (req, res) => {
    try {
        const data = await Schedule.getCurrentStoresDivisions(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
