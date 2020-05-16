const router = require('express').Router();
const Team = require('../../models/team');

router.get('/', async (req, res, next) => {
    try {
        const data = await Team.getAllTeams();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.get('/:teamid', async (req, res, next) => {
    const paramsObj = {
        team_id: req.params.teamid,
    };
    try {
        const data = await Team.getTeamById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const paramsObj = {
        team_name: req.body.team_name,
    };
    try {
        const data = await Team.addNewTeam(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const paramsObj = {
        team_id: req.body.team_id,
        team_name: req.body.team_name,
    };
    try {
        const data = await Team.updateTeamById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

router.delete('/:teamid', async (req, res, next) => {
    const paramsObj = {
        team_id: req.params.teamid,
    };
    try {
        const data = await Team.deleteTeamById(paramsObj);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
