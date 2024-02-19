// const bcrypt = require('bcrypt');

// // Function to hash a password
// const hashPassword = async (password) => {
//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         return hashedPassword;
//     } catch (error) {
//         throw new Error('Password hashing failed');
//     }
// };


// module.exports = { hashPassword }


const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
    try {
        if (!password) {
            throw new Error('Password is required');
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error while hashing password:', error.message);
        throw new Error('Password hashing failed');
    }
};

module.exports = { hashPassword };
