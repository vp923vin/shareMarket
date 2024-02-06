// Import mongoose
const mongoose = require('mongoose');

// Define StocksOHLCData schema
const stocksOHLCDataSchema = new mongoose.Schema({
  Symbol: { type: String, required: true, unique: true }, // Primary Key
  Date: { type: Date, required: true },
  Open: { type: Number, required: true },
  High: { type: Number, required: true },
  Low: { type: Number, required: true },
  Close: { type: Number, required: true },
  Volume: { type: Number, required: true },
  AdjClose: { type: Number, required: true }
});

// Create StocksOHLCData model
const StocksOHLCData = mongoose.model('StocksOHLCData', stocksOHLCDataSchema);

// Export StocksOHLCData model
module.exports = StocksOHLCData;
