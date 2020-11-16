require('dotenv').config();
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
const path = require('path');

const helmet = require('helmet');
app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
