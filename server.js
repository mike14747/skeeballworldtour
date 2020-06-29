require('dotenv').config();
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const app = express();
const path = require('path');

const { mysqlConnect } = require('./config/connectionPool');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/pdf/:filename', function (req, res) {
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

mysqlConnect()
    .then(() => {
        app.use(require('./passport/expressSession'));
        const passport = require('./passport/passportFunctions');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api/admin', checkAuthenticated, require('./controllers/adminControllers'));
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!\n', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).send('There is no connection to the database!');
        });
    })
    .finally(() => {
        if (NODE_ENV === 'production') {
            app.use(express.static('./client/build'));
            app.use(express.static('./admin/build'));
            app.get('/admin', (req, res) => {
                res.sendFile(path.join(__dirname, './admin/build/index.html'));
            });
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/build/index.html'));
            });
        }
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT);
        });
    });
