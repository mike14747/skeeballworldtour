const router = require("express").Router();
const standingsController = require("../../controllers/standingsController");

router.get('/standings', (req, res) => {
    res.json({ route: "standings" });
});

router.get('/standings/:id', (req, res) => {
    res.json({ route: "standings", season_id: req.params });
});

module.exports = router;