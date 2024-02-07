// Import mongoose
const mongoose = require('mongoose');

const flashTradesSchema = new mongoose.Schema({
  TradeID: { type: String, required: true, unique: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key reference to User model
  LotSize: { type: Number, required: true },
  IndexSelected: { type: String, required: true },
  ExpiryDate: { type: Date, required: true },
  StrikeSelection: { type: String, required: true },
  OrderExecution: { type: String, required: true },
  StopLoss: { type: Number, required: true },
  TargetPoints: { type: Number, required: true },
  PartialExit: { type: Boolean, default: false },
  NotificationPreference: { type: String, required: true },
  TradeDate: { type: Date, required: true, default: Date.now },
  TradeStatus: { type: String, required: true },
  EntryTime: { type: Date, required: true },
  ExitTime: { type: Date },
  ActualExitPrice: { type: Number },
  BrokerOrderID: { type: String, required: true }
});


const FlashTrades = mongoose.model('FlashTrades', flashTradesSchema);

module.exports = FlashTrades;
