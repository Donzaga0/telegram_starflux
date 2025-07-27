const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const starPurchaseSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    ton_amount: {
          type: Number,
        required: true
    },
    star_amount: {
        type: Number,
         required: true
    },
    transaction_id: {
        type: String,
        default: () => uuidv4()
    },
    status: {
        type: String,
         enum: ['pending', 'completed'],
         default: 'pending'
    },
    createdAt: {
         type: Date, 
         default: Date.now 
    }
})

const StarPurchase = mongoose.model('StarPurchase', starPurchaseSchema )

module.exports = StarPurchase