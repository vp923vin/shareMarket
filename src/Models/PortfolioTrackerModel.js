const mongoose = require('mongoose');

const portfolioTrackerSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // Primary and Foreign key reference to User model
  StockSymbol: { type: String, required: true },
  Quantity: { type: Number, required: true },
  AveragePrice: { type: Number, required: true },
  CurrentPrice: { type: Number, required: true },
  TotalInvestment: { type: Number, required: true },
  TotalValue: { type: Number, required: true },
  GainLoss: { type: Number, required: true },
  LastUpdated: { type: Date, default: Date.now }
});


const PortfolioTracker = mongoose.model('PortfolioTracker', portfolioTrackerSchema);

module.exports = PortfolioTracker;
