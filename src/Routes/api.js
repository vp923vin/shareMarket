const Express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors'); 
const router = Express.Router();

// call controllers Here
const { 
    register_user, 
    login_user, 
    logout_user 
} = require('../Controllers/Users/UserController');

const { 
    upstoxRedirect, 
    upstoxCallBack, 
    upstoxGetQueryCode, 
    upstoxMarketData 
} = require('../Controllers/Market/Upstox/upstoxController');

const {
    initializeAndConnect,
} = require('../Controllers/websocketController');





// handle routing data
router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));
router.use(cors());

// example route 
// router.get(url, controllerMethod);


// api routes here
router.post('/register', register_user)
router.post('/login', login_user)
router.get('/logout', logout_user)

router.get('/', upstoxGetQueryCode);
router.get('/auth', upstoxRedirect);
router.get('/callback', upstoxCallBack);
router.get('/market-data', upstoxMarketData);
router.get('/websocket-data', initializeAndConnect);

module.exports = { apiRoutes: router };