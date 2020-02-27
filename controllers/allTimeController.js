const router = require('express').Router();
const AllTime = require('../models/allTime');

router.get('/individual/one-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await AllTime.getIndividualPointsInAGame({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][1], data[1][2]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/ten-game/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await AllTime.getIndividualPointsInAMatch({
            period: 'match',
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][1], data[1][2]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/individual/career-points/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await AllTime.getIndividualPointsInACareer({
            period: 'career',
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][1], data[1][2]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
