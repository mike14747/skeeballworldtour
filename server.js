require('dotenv').config();
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/pdf/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'pdf/' + req.params.filename));
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ message: 'User needs admin priviledges!' });
        // return next();
    }
}

const { dbTest } = require('./config/connectionPool');

app.use(require('./controllers/testController'));

dbTest()
    .then(() => {
        app.use(require('./passport/expressSession'));
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api/admin', checkAuthenticated, require('./controllers/adminControllers'));
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'An error occurred connecting to the database! ' + error.message });
        });
    })
    .finally(() => {
        if (process.env.NODE_ENV === 'production') {
            // app.use(express.static(path.join(__dirname, 'admin/build')));
            // app.get('/admin', (req, res) => {
            //     res.sendFile(path.join(__dirname, 'admin/build/index.html'));
            // });
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        }
    });

const server = app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = server;
