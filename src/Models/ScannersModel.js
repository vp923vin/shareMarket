// Import mongoose
const mongoose = require('mongoose');

// Define Scanners schema
const scannersSchema = new mongoose.Schema({
  ScannerID: { type: String, required: true, unique: true }, // Primary Key
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key reference to User model
  ScanType: { type: String, required: true },
  Conditions: { type: String },
  ScanResults: { type: String },
  ScanDate: { type: Date, default: Date.now }
});

// Create Scanners model
const Scanners = mongoose.model('Scanners', scannersSchema);

// Export Scanners model
module.exports = Scanners;
