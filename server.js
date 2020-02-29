require('dotenv').config();
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
}

const controllers = require('./controllers');
app.use('/api', controllers);

app.get('*', (req, res) => {
    if (NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Server now listening on PORT ${PORT}!`);
});
