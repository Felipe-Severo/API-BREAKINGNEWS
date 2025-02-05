const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    } 
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;