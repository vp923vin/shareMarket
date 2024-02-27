const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors'); 
const { upstoxRedirect, upstoxCallBack, upstoxFinalCallback } = require('../Controllers/Market/Upstox/upstoxController');

const upstox_router = express.Router();
upstox_router.use(cors());
upstox_router.use(bodyParser.json());
upstox_router.use(express.json());



// Registration endpoint
upstox_router.get('/auth', upstoxRedirect);
upstox_router.get('/callback', upstoxCallBack);
upstox_router.get('/getUpstoxResult', upstoxFinalCallback);


module.exports = upstox_router;
