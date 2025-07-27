const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tonTransactionSchema = mongoose.Schema({
    user_id: {
        type: String, // Telegram user ID
        required: true
    },
    ton_amount: {
        type: Number, // Amount of TON to collect
        required: true
    },
    transaction_id: {
        type: String,
        default: uuidv4 // Unique transaction ID
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const TonTransaction = mongoose.model('TonTransaction', tonTransactionSchema );

module.exports = TonTransaction