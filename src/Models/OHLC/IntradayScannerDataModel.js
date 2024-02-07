// Import mongoose
const mongoose = require('mongoose');

// Define IntradayScannerData schema
const intradayScannerDataSchema = new mongoose.Schema({
    Symbol: { type: String, required: true },
    Timestamp: { type: Date, required: true },
    Open: { type: Number, required: true },
    High: { type: Number, required: true },
    Low: { type: Number, required: true },
    Close: { type: Number, required: true },
    Volume: { type: Number, required: true },
    AdjClose: { type: Number, required: true },
}, {
    // Specify the primary key as a compound key (Symbol, Timestamp)
    _id: false,
    autoIndex: false,
    id: false
});

// Create IntradayScannerData model
const IntradayScannerData = mongoose.model('IntradayScannerData', intradayScannerDataSchema);

// Export IntradayScannerData model
module.exports = IntradayScannerData;
