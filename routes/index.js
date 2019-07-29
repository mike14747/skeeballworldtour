const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const htmlRoutes = require("./html");

// router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

// If no included route paths are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
