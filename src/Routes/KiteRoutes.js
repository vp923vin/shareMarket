const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors'); 
const { kiteRedirect, kiteCallBack } = require('../Controllers/Market/ZerodhaMarket/kiteController');

const kite_router = express.Router();
kite_router.use(cors());
kite_router.use(bodyParser.json());
kite_router.use(express.json());



// Registration endpoint
kite_router.get('/auth', kiteRedirect);
kite_router.get('/callback', kiteCallBack);


module.exports = kite_router;
