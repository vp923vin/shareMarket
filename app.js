require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const user_router = require('./src/Routes/UserRoutes');
require("./src/Config/database")
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use("/api/v1/", user_router)
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Stock Market!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
