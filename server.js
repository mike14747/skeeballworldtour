require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const controllers = require("./controllers/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use('/api', controllers);

app.listen(PORT, () => {
    console.log(`Server now listening on PORT ${PORT}!`);
});
