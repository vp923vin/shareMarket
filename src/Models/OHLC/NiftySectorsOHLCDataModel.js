// Import mongoose
const mongoose = require('mongoose');

// Define NiftySectorsOHLCData schema
const niftySectorsOHLCDataSchema = new mongoose.Schema({
  SectorID: { type: Number, required: true, unique: true }, // Primary Key
  SectorName: { type: String, required: true },
  Date: { type: Date, required: true },
  Open: { type: Number, required: true },
  High: { type: Number, required: true },
  Low: { type: Number, required: true },
  Close: { type: Number, required: true },
  Volume: { type: Number, required: true },
  AdjClose: { type: Number, required: true }
});

// Create NiftySectorsOHLCData model
const NiftySectorsOHLCData = mongoose.model('NiftySectorsOHLCData', niftySectorsOHLCDataSchema);

// Export NiftySectorsOHLCData model
module.exports = NiftySectorsOHLCData;
