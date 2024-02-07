// Import mongoose
const mongoose = require('mongoose');

// Define DailyTimeFrameAnalysis schema
const dailyTimeFrameAnalysisSchema = new mongoose.Schema({
    Symbol: { type: String, required: true },
    Date: { type: Date, required: true },
    Open: { type: Number, required: true },
    High: { type: Number, required: true },
    Low: { type: Number, required: true },
    Close: { type: Number, required: true },
    Volume: { type: Number, required: true },
    AdjClose: { type: Number, required: true },
}, {
    // Specify the primary key as a compound key (Symbol, Date)
    _id: false,
    autoIndex: false,
    id: false
});

// Create DailyTimeFrameAnalysis model
const DailyTimeFrameAnalysis = mongoose.model('DailyTimeFrameAnalysis', dailyTimeFrameAnalysisSchema);

// Export DailyTimeFrameAnalysis model
module.exports = DailyTimeFrameAnalysis;
