const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const User = require('../Models/UserModel');
const { register_user } = require('../Controllers/UserController');

const user_router = express.Router();

user_router.use(bodyParser.json());
user_router.use(express.json());



// Registration endpoint
user_router.post('/register', register_user)


module.exports = user_router;
