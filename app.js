require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// routes config
const configRoutes = require('./src/Config/Routes');
// db config
require("./src/Config/database");
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome, to the Share Market!');
});

configRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at ${process.env.APP_BASE_URL}`);
});
