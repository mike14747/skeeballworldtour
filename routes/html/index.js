const router = require("express").Router();
const homeRoutes = require("./home");
const standingsRoutes = require("./standings");
router.use("/", homeRoutes);
router.use("/", standingsRoutes);

module.exports = router;
