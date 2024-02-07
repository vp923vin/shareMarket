
const mongoose = require('mongoose');


const settingsSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // Primary and Foreign key reference to User model
  ApplicationSettings: { type: String },
  PlanDetails: { type: String },
  UserPreferences: { type: String }
});


const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
