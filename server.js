require('dotenv').config();
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const app = express();
const path = require('path');

const connectionPool = require('./config/connectionPool');

const passport = require('passport');
const session = require('express-session');
const sessionStore = require('./config/sessionStore');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    key: 'swt',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true, // setting this to true creates a cookie and session before anyone is logged in
    cookie: {
        maxAge: 2592000000, // maxAge: 2592000000 is 30 days
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/pdf/:filename', function (req, res) {
    res.sendFile(path.join(__dirname, 'pdf/' + req.params.filename));
});

connectionPool.mysqlConnect()
    .then(() => {
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.error('Failed to connect to the database!\n' + error);
        app.get('/api', (req, res) => {
            res.status(500).send('There is no connection to MySQL!');
        });
    })
    .finally(() => {
        if (NODE_ENV === 'production') {
            app.use(express.static('./client/build'));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/build/index.html'));
            });
        }
        app.get('/', (req, res) => {
            console.log(req.session);
        });
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT);
        });
    });
