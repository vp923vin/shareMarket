const User = require('../Models/UserModel');
const { hashPassword } = require("../Utiles/function")




const register_user = async (req, res) => {
    try {
        const {
            Username,
            Password,
            Email,
            DematAccountType,
            BrokerName,
            SubscriptionPlan,
            Phone,
            Address,
            AccountBalance,
            role
        } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(Password);

        // Create a new user
        const newUser = new User({
            Username,
            Password: hashedPassword,
            Email,
            DematAccountType,
            BrokerName,
            SubscriptionPlan,
            Phone,
            Address,
            AccountBalance,
            role,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

        // Respond with token and user details
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    register_user
}