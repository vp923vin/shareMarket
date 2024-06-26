const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true , unique : true},
  Email: { type: String, required: true, unique: true },
  LastLogin: { type: Date },
  Phone: { type: String, required: true },
  Address: { type: String, default: null },
  AccountBalance: { type: Number, default: 0 },
  Role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
