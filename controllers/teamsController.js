const router = require('express').Router();
const Team = require('../models/team');

router.get('/:teamid/seasons/:seasonid', async (req, res) => {
    const paramsObj = {
        team_id: req.params.teamid,
        season_id: req.params.seasonid,
    };
    try {
        const data = await Team.getTeamStatsByTeamSeasonId(paramsObj);
        res.json(data);
    } catch (err) {
        console.log('An error has occurred! ' + err);
        res.status(500).send('Request failed... please check your request and try again!');
    }
});

module.exports = router;
