const mysql = require("mysql2");

const options = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    multipleStatements: true
}
const connection = mysql.createConnection(options);
connection.connect();

module.exports = connection;