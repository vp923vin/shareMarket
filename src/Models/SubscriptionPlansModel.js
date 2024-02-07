// Import mongoose
const mongoose = require('mongoose');

// Define SubscriptionPlans schema
const subscriptionPlansSchema = new mongoose.Schema({
  PlanID: { type: String, required: true, unique: true }, // Primary Key
  PlanName: { type: String, required: true },
  Features: { type: String },
  Price: { type: Number, required: true }
});

// Create SubscriptionPlans model
const SubscriptionPlans = mongoose.model('SubscriptionPlans', subscriptionPlansSchema);

// Export SubscriptionPlans model
module.exports = SubscriptionPlans;
