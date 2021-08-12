require('dotenv').config();
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const path = require('path');

const helmet = require('helmet');
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: false,
        directives: {
            /* eslint-disable quotes */
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:'],
            'font-src': ["'self'"],
            /* eslint-enable quotes */
        },
    }),
);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.urlencoded({ limit: '20mb', parameterLimit: 100000, extended: true }));
app.use(express.json({ limit: '20mb' }));

app.get('/pdf/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'pdf/' + req.params.filename));
});

const { dbTest } = require('./config/connectionPool');

app.use(require('./controllers/testController'));

dbTest()
    .then(() => {
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'An error occurred connecting to the database! ' + error.message });
        });
    })
    .finally(() => {
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        }
    });

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = app;
