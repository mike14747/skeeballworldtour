const router = require('express').Router();
const AllTime = require('../models/allTime');

router.get('/individual/average/num-leaders/:numleaders', async (req, res, next) => {
    try {
        const data = await AllTime.getIndividualPointsInAPeriod({
            num_leaders: Number(req.params.numleaders),
        });
        data[0] ? res.json([data[1][2], data[1][3]]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
