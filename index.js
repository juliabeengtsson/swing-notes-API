// läser .env filen
require('dotenv').config();

const express = require('express');
const app = express();

// hämtar porten från .env filen
const port = process.env.PORT || '1234'

const server = app.listen(port, process.env.BASE_URL, () => {
    console.log(`server is running ${port}`)
})