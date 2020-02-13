const router = require('express').Router();
const Season = require('../models/season');

router.get('/champions', async (req, res, next) => {
    try {
        const data = await Season.getAllChampions();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const data = await Season.getAllSeasons();
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await Season.getSeasonById({
            id: req.params.id,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/name', async (req, res, next) => {
    try {
        const data = await Season.getSeasonNameYearById({
            id: req.params.id,
        });
        data[0] ? res.json(data[1]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
