require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || '1234'

app.use(express.json());

const notesRoutes = require('./routes/noteRoutes');
app.use('/api/notes', notesRoutes)

const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./docs/docs.json');

app.use('/api/docs', swaggerUI.serve);
app.get('/api/docs', swaggerUI.setup(apiDocs));

app.listen(port, process.env.BASE_URL, () => {
    console.log(`server is running ${port}`)
})