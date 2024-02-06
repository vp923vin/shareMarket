
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserID: { type: String, required: true, unique: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  DematAccountType: { type: String, required: true },
  BrokerName: { type: String, required: true },
  SubscriptionPlan: { type: String, required: true },
  LastLogin: { type: Date },
  RegistrationDate: { type: Date, default: Date.now },
  Phone: { type: String, required: true },
  Address: { type: String, required: true },
  AccountBalance: { type: Number, required: true },
  TransactionHistory: { type: String, default: "" }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
