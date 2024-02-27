require('dotenv').config();
const axios = require('axios');

const appBaseUri = process.env.APP_BASE_URL

// Redirect URL where Zerodha will redirect after authentication
const redirectUri = `${appBaseUri}/api/callback`;
const requestUri = `${appBaseUri}/api/getUpstoxResult`;

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
        const apiUpstoxUrl = `https://api.upstox.com/v2/login/authorization/token?code=${code}&client_id=${apiKey}&client_secret=${apiSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
        // Exchange request token for access token
        const payload = {}
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const response = await axios.post(apiUpstoxUrl, payload, { headers });

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


const upstoxFinalCallback = (req, res) => {
    const {data} = req.body;
    return res.status(200).json({
        "status": true,
        "message": "check the user",
        "responseData": data
    });
}


module.exports = {
    upstoxRedirect,
    upstoxCallBack,
    upstoxFinalCallback
}