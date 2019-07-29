const router = require("express").Router();
const db = require("../models/index");

// router.get("/store/:id", (req, res) => {
//     db.Store.selectOneActive(req.params.id, (data) => {
//         res.json(data);
//     });
// });

module.exports = router;