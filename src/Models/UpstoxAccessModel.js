const mongoose = require('mongoose');
// Update the schema to include additional fields
const UpstoxAccessSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: null, 
    },
    user_type: {
        type: String,
        enum: ['individual', 'corporate'], // Assuming user type can be either 'individual' or 'corporate'
    },
    order_types: [String], // Array of order types
    products: [String], // Array of products
    exchanges: [String], // Array of exchanges
    email: {
        type: String,
    },
    broker: {
        type: String,
    },
    storedAt: {
        type: Date,
        default: Date.now
    }
});

// Define a static method to upsert access token and additional fields
UpstoxAccessSchema.statics.upsertAccessToken = async function(
    accessToken,
    is_active,
    user_type,
    order_types,
    products,
    exchanges,
    email,
    broker
) {
    try {
        // Find the first record
        let upstoxAccess = await this.findOne();

        // If a record exists, update it. Otherwise, create a new one.
        if (upstoxAccess) {
            upstoxAccess.accessToken = accessToken;
            upstoxAccess.is_active = is_active;
            upstoxAccess.user_type = user_type;
            upstoxAccess.order_types = order_types;
            upstoxAccess.products = products;
            upstoxAccess.exchanges = exchanges;
            upstoxAccess.email = email;
            upstoxAccess.broker = broker;
            upstoxAccess.storedAt = new Date();
            await upstoxAccess.save();
        } else {
            upstoxAccess = new this({
                accessToken,
                is_active,
                user_type,
                order_types,
                products,
                exchanges,
                email,
                broker
            });
            await upstoxAccess.save();
        }
        return upstoxAccess;
    } catch (error) {
        console.error('Error upserting Upstox access token:', error);
        throw error;
    }
};





// Create and export the UpstoxAccess model
const UpstoxAccess = mongoose.model('UpstoxAccess', UpstoxAccessSchema);
module.exports = UpstoxAccess;
