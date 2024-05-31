require('dotenv').config();
const axios = require('axios');
const UpstoxAccess = require('../../../Models/UpstoxAccessModel');

const appBaseUri = process.env.APP_BASE_URL
const redirectUri = `${appBaseUri}/api`;
const apiKey = process.env.UPSTOX_API_KEY;
const apiSecret = process.env.UPSTOX_API_SECERET_KEY;

const upstoxRedirect = (req, res) => {
    const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}`;
    res.redirect(authUrl);
}

const upstoxCallBack = async (req, res) => {
    try {
        const { code } = req.query;
        const apiUpstoxUrl = `https://api.upstox.com/v2/login/authorization/token?code=${code}&client_id=${apiKey}&client_secret=${apiSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;

        const payload = {};
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const response = await axios.post(apiUpstoxUrl, payload, { headers });

        const responseData = {
            data: response.data
        };

        return res.status(200).json(responseData);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
}

const upstoxGetQueryCode = async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({
            status: false,
            message: "Code not found in URL query parameters."
        });
    }

    try {
        const apiCallbackUrl = `${appBaseUri}/api/callback?code=${code}`;
        const response = await axios.get(apiCallbackUrl);
        // const upstoxData = response.data.data;
        // console.log(upstoxData)
        const upstoxAccess = await UpstoxAccess.upsertAccessToken(
            response.data.data.access_token,
            response.data.data.is_active,
            response.data.data.user_type,
            response.data.data.order_types,
            response.data.data.products,
            response.data.data.exchanges,
            response.data.data.email,
            response.data.data.broker
        );

        return res.status(200).json({
            status: true,
            message: "API call success!",
            responseData: upstoxAccess
        });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


const upstoxMarketData = (req, res) => {
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI0MjcxNzIiLCJqdGkiOiI2NWUxYWY2NzQ1NzRjZDA5NDI0YWY1MmEiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDkyODkzMTksImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwOTMzMDQwMH0.4SLnrTJwVFyhaj7J7QwsycqefBY5nuibMO7q5yZJk68'
    const instrumentKey = 'NSE_EQ%7CINE848E01016,NSE_EQ|IN1720230029,NSE_EQ|INE669E01016,NSE_EQ|IN1920220085,NSE_EQ|IN2920230223,NSE_EQ|IN3620230034,NSE_EQ|IN1020220597'
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.upstox.com/v2/market-quote/quotes?instrument_key=${instrumentKey}`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    };

    axios(config)
        .then((response) => {
            // Send the JSON response data back to the client
            res.json(response.data);
        })
        .catch((error) => {
            // Handle errors
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        });
}

module.exports = {
    upstoxRedirect,
    upstoxCallBack,
    upstoxGetQueryCode,
    upstoxMarketData
}