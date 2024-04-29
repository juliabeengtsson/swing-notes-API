// läser .env filen
require('dotenv').config();

const express = require('express');
const app = express();

const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./docs/docs.json');

// hämtar porten från .env filen
const port = process.env.PORT || '1234'

// Tolker allt som kommer in i body till json
app.use(express.json());
// På den URL:en ska vår dokumenation visas
app.use('/api/docs', swaggerUI.serve);
// Gör en setup på alla data som finns i vår apiDocs.
app.get('/api/docs', swaggerUI.setup(apiDocs));

// testar postman med en get-funktion
app.get('/', (req, res) => {
    res.send('Vi testar')
})

const server = app.listen(port, process.env.BASE_URL, () => {
    console.log(`server is running ${port}`)
})