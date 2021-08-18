const router = require('express').Router();
const Store = require('../models/store');

router.get('/', async (req, res, next) => {
    try {
        const data = await Store.getAllActive();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/all-for-mongo', async (req, res, next) => {
    try {
        const data = await Store.getAllStores();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Store.getOneActive({
            id: req.params.id,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:storeid/divisions/:divisionid', async (req, res, next) => {
    try {
        const data = await Store.getOneStoreDivision({
            store_id: req.params.storeid,
            division_id: req.params.divisionid,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
