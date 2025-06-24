const mongoose = require('mongoose');

const starSchema = mongoose.Schema({
    recipient: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    pricePerStarUSD: {
        type: Number,
        required: true
    },
    totalUSD: {
        type: Number,
        required: true
    },
    totalTON: {
        type: Number,
        required: true
    },
    profitUSD: {
        type: Number,
       default: 0
    },
    profitTON: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Star = mongoose.model('Star', starSchema);

module.exports = Star;