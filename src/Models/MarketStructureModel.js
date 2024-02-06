// Import mongoose
const mongoose = require('mongoose');

const marketStructureSchema = new mongoose.Schema({
  SectorID: { type: String, required: true, unique: true }, // Primary Key
  SectorName: { type: String, required: true },
  AdvancingStocks: { type: Number, required: true },
  DecliningStocks: { type: Number, required: true },
  Gainers: { type: Number, required: true },
  Losers: { type: Number, required: true },
  MarketSentiments: { type: String },
  LastUpdated: { type: Date, default: Date.now }
});


const MarketStructure = mongoose.model('MarketStructure', marketStructureSchema);

// Export MarketStructure model
module.exports = MarketStructure;
