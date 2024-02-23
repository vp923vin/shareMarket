require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

const appBaseUri = process.env.APP_BASE_URL
// Redirect URL where Zerodha will redirect after authentication
const redirectUri = `${appBaseUri}api/callback`;

// API key and secret obtained from Zerodha developer dashboard
const apiKey = process.env.UPSTOX_API_KEY;
const apiSecret = process.env.UPSTOX_API_SECERET_KEY;
const grantType = "authorization_code";

const upstoxRedirect = (req, res) => {
    const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}`;
    res.redirect(authUrl);
}


// Route to handle OAuth2 callback
const upstoxCallBack = async (req, res) => {
    try {
        const { code } = req.query;

        // Exchange request token for access token
        const response = await axios.post('https://api.upstox.com/v2/login/authorization/token', querystring.stringify({
            code: code,
            client_id: apiKey,
            client_secret: apiSecret,
            redirect_uri: redirectUri,
            grant_type: grantType
        }));

        return res.status(200).json({
            status: true,
            message: "succesfully get Token",
            data: response
        });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }

}


module.exports = {
    upstoxRedirect,
    upstoxCallBack
}