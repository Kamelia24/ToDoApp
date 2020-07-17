const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys')
const { Client } = require('pg');
client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});
client.connect();
module.exports = (req, res, next) => {
    console.log("in reqquire admin", req.user);
    if (req.user[0].role == 'admin') {
        next();
    } else {
        res.status(401).json({ error: "you have to be admin" })
    }
}