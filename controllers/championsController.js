const router = require('express').Router();
const Champion = require('../models/champion');

router.get('/', async (req, res) => {
    try {
        const data = await Champion.getAllChampions();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
