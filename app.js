require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
// routes config
const configRoutes = require("./src/Config/Routes");
// db config
require("./src/Config/database");
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Welcome, to the Share Market!");
});

app.get('/market-data', (req, res) => {
    res.render('socket-data.ejs');
});

app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

configRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at ${process.env.APP_BASE_URL}`);
});
