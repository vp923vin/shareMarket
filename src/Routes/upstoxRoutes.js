const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors'); 
const { upstoxRedirect, upstoxCallBack, upstoxGetQueryCode} = require('../Controllers/Market/Upstox/upstoxController');

const upstox_router = express.Router();
upstox_router.use(cors());
upstox_router.use(bodyParser.json());
upstox_router.use(express.json());



// Registration endpoint
upstox_router.get('/', upstoxGetQueryCode);
upstox_router.get('/auth', upstoxRedirect);
upstox_router.get('/callback', upstoxCallBack);


module.exports = upstox_router;
