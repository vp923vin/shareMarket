require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const user_router = require('./src/Routes/UserRoutes');
// const kite_router = require('./src/Routes/KiteRoutes');
const upstocx_router = require('./src/Routes/upstoxRoutes');
require("./src/Config/database")
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", user_router)
// app.use("/api", kite_router)
app.use("/api", upstocx_router)

app.get('/', (req, res) => {
    res.send('Welcome, to the Share Market!');
});

app.listen(port, () => {
    console.log(`Server is running at ${process.env.APP_BASE_URL}`);
});
