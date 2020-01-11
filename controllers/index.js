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

const championsController = require('./championsController');
router.use('/champions', championsController);

const resultsController = require('./resultsController');
router.use('/results', resultsController);

module.exports = router;
