// Import mongoose
const mongoose = require('mongoose');

// Define SubscriptionPlans schema
const subscriptionPlansSchema = new mongoose.Schema({
  PlanID: { type: String, required: true, unique: true }, 
  PlanName: { type: String, required: true },
  Features: { type: String },
  Price: { type: Number, required: true }
});

const SubscriptionPlans = mongoose.model('SubscriptionPlans', subscriptionPlansSchema);
module.exports = SubscriptionPlans;
