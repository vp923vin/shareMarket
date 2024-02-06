// Import mongoose
const mongoose = require('mongoose');

// Define TradeDiary schema
const tradeDiarySchema = new mongoose.Schema({
  TradeID: { type: String, required: true, unique: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key reference to User model
  TradeType: { type: String, required: true },
  EntryPrice: { type: Number, required: true },
  ExitPrice: { type: Number },
  ProfitLoss: { type: Number },
  TradeDate: { type: Date, required: true, default: Date.now },
  Notes: { type: String }
});

// Create TradeDiary model
const TradeDiary = mongoose.model('TradeDiary', tradeDiarySchema);

// Export TradeDiary model
module.exports = TradeDiary;
