const router = require('express').Router();
const Store = require('../models/store');

router.get('/', async (req, res, next) => {
    try {
        const data = Store.getAllStores();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }

});

router.get('/storeid', async (req, res, next) => {
    const paramsObj = {
        store_id: req.params.store_id,
    };
    try {
        const data = Store.getStoreById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        store_name: req.body.store_name,
        store_address: req.body.store_address,
        store_city: req.body.store_city,
        store_state: req.body.store_state,
        store_zip: req.body.store_zip,
        store_phone: req.body.store_phone,
        map_url: req.body.map_url,
        active: req.body.active,
    };
    try {
        const data = await Store.addNewStore(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        store_name: req.body.store_name,
        store_address: req.body.store_address,
        store_city: req.body.store_city,
        store_state: req.body.store_state,
        store_zip: req.body.store_zip,
        store_phone: req.body.store_phone,
        map_url: req.body.map_url,
        active: req.body.active,
    };
    try {
        const data = await Store.updateStore(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/storeid', async (req, res, next) => {
    const paramsObj = {
        store_id: req.params.store_id,
    };
    try {
        const data = Store.deleteStore(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
