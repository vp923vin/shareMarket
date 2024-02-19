const User = require('../../Models/UserModel');
const bcrypt = require('bcrypt');
const { hashPassword } = require("../../Utiles/hashPassword");
const { generateToken, verifyToken } = require("../../Utiles/JwtToken");

const register_user = async (req, res) => {
    try {
        const { Username, Email, Password, Phone} = req.body;
        console.log(req.body)
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ 
                staus: false,
                message: 'User already exists.' 
            });
        }
        const hashedPassword = await hashPassword(Password);
        // console.log(hashedPassword);
        
        const newUser = new User({
            Username,
            Password: hashedPassword,
            Email,
            Phone,
        });

        await newUser.save();
        res.status(201).json({ 
            status: true,
            message: "New user registerd successfully!", 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            staus: false,
            message: 'Internal Server Error' 
        });
    }
};

const login_user = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({
                staus: false,
                message: 'Invalid email or password' 
            });
        }

        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (!passwordMatch) {
            return res.status(400).json({ 
                staus: false,
                message: 'Invalid email or password' 
            });
        }

        let token = generateToken({ user: user});
        let check = verifyToken(token)

        res.status(200).json({ 
            status: true,
            message: "Login success",
            token:  token,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            staus: false,
            message: 'Internal Server Error' 
        });
    }
}

const logout_user = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            res.status(401).json({ 
                status: false, 
                message: 'Unauthorized request.' 
            });

        }

        const decodedToken = verifyToken(token);
        if(!decodedToken){
            res.status(400).json({ 
                status: false, 
                message: 'Invalid Token Unable to logout.' 
            });
        }

        res.status(200).json({ 
            status: true, 
            message: 'Logout successful' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false, 
            message: 'Internal Server Error.' 
        });
    }
}


module.exports = {
    register_user,
    login_user,
    logout_user
}