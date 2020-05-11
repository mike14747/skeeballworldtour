const router = require('express').Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.use('/stores', require('./storesController'));

router.use('/settings', require('./settingsController'));

router.use('/pages', require('./pagesController'));

router.use('/teams', require('./teamsController'));

router.use('/players', require('./playersController'));

router.use('/standings', require('./standingsController'));

router.use('/schedules', require('./schedulesController'));

router.use('/searches', require('./searchesController'));

router.use('/results', require('./resultsController'));

router.use('/seasons', require('./seasonsController'));

router.use('/leaders', require('./leadersController'));

router.use('/all-time', require('./allTimeController'));

router.use('/auth', require('./authController'));

router.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).send('An error occurred!\n' + error.message);
});

module.exports = router;
