const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Instruments = require('./src/Models/MarketDetailModel'); // Import your Mongoose model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ShareMarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  // Read data from CSV file and store in database
  fs.createReadStream('MCX.csv')
    .pipe(csv())
    .on('data', (row) => {
      // Create a new instance of your Mongoose model with data from the CSV row
      const instrument = new Instruments({
        instrument_key: row.instrument_key || null,
        exchange_token: parseInt(row.exchange_token) || null,
        tradingsymbol: row.tradingsymbol || null,
        name: row.name || null,
        last_price: parseFloat(row.last_price) || null,
        expiry: row.expiry || null,
        strike: parseFloat(row.strike) || null,
        tick_size: parseFloat(row.tick_size) || null,
        lot_size: parseInt(row.lot_size) || null,
        instrument_type: row.instrument_type || null,
        option_type: row.option_type || null,
        exchange: row.exchange || null
      });

      // Save the instance to the database
      instrument.save()
        .then(() => console.log('Instrument saved successfully'))
        .catch((err) => console.error('Error saving instrument:', err));
    })
    .on('end', () => {
      console.log('CSV file processing completed');
    });
});
