const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour les catways
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro unique du catway (requis)
 * @property {'long'|'short'} type - Type du catway (requis, valeurs acceptées: 'long', 'short')
 * @property {string} catwayState - État du catway (requis)
 */
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
