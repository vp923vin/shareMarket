require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Redirect URL where Zerodha will redirect after authentication
const redirectUri = 'http://localhost:3000/api/callback';

// API key and secret obtained from Zerodha developer dashboard
const apiKey = process.env.KITE_API_KEY;
const apiSecret = process.env.KITE_API_SECERET_KEY;


const kiteRedirect = (req, res) => {
    const authUrl = `https://kite.trade/connect/login?api_key=${apiKey}&v=3&redirect_uri=${redirectUri}`;
    res.redirect(authUrl);
}


// Route to handle OAuth2 callback
const kiteCallBack = async (req, res) => {
    try {
        const { request_token } = req.query;

        // Exchange request token for access token
        const response = await axios.post('https://api.kite.trade/session/token', querystring.stringify({
            api_key: apiKey,
            request_token,
            checksum: apiSecret // Use your API secret as checksum
        }));

        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);

        // Now you have the access token, you can use it to make authenticated API requests

        res.send('Authentication successful!');
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }

}


module.exports = {
    kiteRedirect,
    kiteCallBack
}