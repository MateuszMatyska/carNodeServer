const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
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
});

module.exports = mongoose.model('Car', carSchema);
