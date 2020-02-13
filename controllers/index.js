const router = require('express').Router();

const storesController = require('./storesController');
router.use('/stores', storesController);

const settingsController = require('./settingsController');
router.use('/settings', settingsController);

const pagesController = require('./pagesController');
router.use('/pages', pagesController);

const teamsController = require('./teamsController');
router.use('/teams', teamsController);

const playersController = require('./playersController');
router.use('/players', playersController);

const standingsController = require('./standingsController');
router.use('/standings', standingsController);

const schedulesController = require('./schedulesController');
router.use('/schedules', schedulesController);

const searchesController = require('./searchesController');
router.use('/searches', searchesController);

const resultsController = require('./resultsController');
router.use('/results', resultsController);

const seasonsController = require('./seasonsController');
router.use('/seasons', seasonsController);

const leadersController = require('./leadersController');
router.use('/leaders', leadersController);

router.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).send('An error occurred!\n' + error.message);
});

module.exports = router;
