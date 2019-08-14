const router = require("express").Router();
const db = require("../models/index");

router.get("/settings", (req, res) => {
    db.Setting.selectSettings((data) => {
        res.json(data);
    });
});

router.get("/cur_season", (req, res) => {
    db.Setting.selectSeason((data) => {
        res.json(data);
    });
});

router.get("/homepage_news", (req, res) => {
    db.StoreText.selectHomepageNews((data) => {
        res.json(data);
    });
});

router.get("/rules", (req, res) => {
    db.StoreText.selectRules((data) => {
        res.json(data);
    });
});

router.get("/standings/:id", (req, res) => {
    db.Standings.selectStandingsBySeason(req.params.id, (data) => {
        res.json(data);
    });
});

router.get("/search/players/:criteria", (req, res) => {
    db.Player.searchPlayers(req.params.criteria, (data) => {
        res.json(data);
    });
});

router.get("/search/teams/:criteria", (req, res) => {
    db.Team.searchTeams(req.params.criteria, (data) => {
        res.json(data);
    });
});

module.exports = router;