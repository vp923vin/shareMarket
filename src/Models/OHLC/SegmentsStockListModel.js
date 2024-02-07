// Import mongoose
const mongoose = require('mongoose');

// Define SegmentsStockList schema
const segmentsStockListSchema = new mongoose.Schema({
    SegmentID: { type: Number, required: true, unique: true }, // Primary Key
    SegmentName: { type: String, required: true },
    StockSymbol: { type: String, required: true },
});

// Create SegmentsStockList model
const SegmentsStockList = mongoose.model('SegmentsStockList', segmentsStockListSchema);

// Export SegmentsStockList model
module.exports = SegmentsStockList;
