require('dotenv').config();
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const app = express();
const path = require('path');

const connectionPool = require('./config/connectionPool');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT);
        });
    });
