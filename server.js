const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const { readdirSync } = require('fs');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

global.db = db;

readdirSync('./routes').map((item) => {
    app.use('/api', require('./routes/' + item))
})


app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`)
});



