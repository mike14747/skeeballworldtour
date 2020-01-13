const router = require('express').Router();
const Store = require('../models/store');

router.get('/', async (req, res) => {
    try {
        const data = await Store.getAllActive();
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await Store.getOneActive(req.params.id);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

router.get('/:storeid/divisions/:divisionid', async (req, res) => {
    const paramsObj = {
        store_id: req.params.storeid,
        division_id: req.params.divisionid,
    };
    try {
        const data = await Store.getOneStoreDivision(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
