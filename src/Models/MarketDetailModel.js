const mongoose = require('mongoose');

const InstrumentSchema = new mongoose.Schema({
  instrument_key: { type: String, default: '' },
  exchange_token: { type: Number, default: 0 },
  tradingsymbol: { type: String, default: '' },
  name: { type: String, default: '' },
  last_price: { type: Number, default: 0 },
  expiry: { type: String, default: '' },
  strike: { type: Number, default: 0 },
  tick_size: { type: Number, default: 0 },
  lot_size: { type: Number, default: 0 },
  instrument_type: { type: String, default: '' },
  option_type: { type: String, default: '' },
  exchange: { type: String, default: '' }
});

// Middleware to remove default values if the field is null
InstrumentSchema.pre('save', function(next) {
  const doc = this;
  Object.keys(doc._doc).forEach(field => {
    if (doc._doc[field] === null) {
      doc._doc[field] = undefined;
    }
  });
  next();
});

const Instruments = mongoose.model('Instrument', InstrumentSchema);
module.exports =  Instruments; 
