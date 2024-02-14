const mongoose = require('mongoose');
require('dotenv').config();


const dbConnect = mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Db Connected")
}).catch((err) => {
    console.log(err)
})

module.exports = dbConnect;
