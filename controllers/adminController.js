const router = require('express').Router();

router.get('/', async (req, res, next) => {
    res.send('Sending this from the /admin (/api/admin) GET route!');
});

module.exports = router;
