const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les réservations
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - Numéro du catway réservé (requis)
 * @property {string} clientName - Nom du client (requis)
 * @property {string} boatName - Nom du bateau (requis)
 * @property {Date} checkIn - Date d'arrivée (requis)
 * @property {Date} checkOut - Date de départ (requis)
 */
const reservationSchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    boatName: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
