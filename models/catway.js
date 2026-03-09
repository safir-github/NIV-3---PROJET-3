const mongoose = require("mongoose");


const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['long', 'short']
    },
    catwayState: {
        type: String,
        required: true
    }
});

const Catway = mongoose.model('Catway', catwaySchema);

module.exports = Catway;