const Reservation = require("../models/reservation");

/**
 * Récupère toutes les réservations d'un catway
 * @param {number} catwayNumber - Numéro du catway
 * @returns {Promise<Array<Object>>} Liste des réservations du catway
 */
const getReservationsByCatway = async (catwayNumber) => {
    try {
        const reservations = await Reservation.find({ catwayNumber });
        return reservations;
    } catch (error) {
        throw error;
    }
};

/**
 * Récupère une réservation par son ID
 * @param {string} id - Identifiant MongoDB de la réservation
 * @returns {Promise<Object>} Réservation trouvée
 * @throws {Error} "Réservation non trouvée" si l'ID n'existe pas
 */
const getReservationById = async (id) => {
    try {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            throw new Error("Réservation non trouvée");
        }

        return reservation;
    } catch (error) {
        throw error;
    }
};

/**
 * Crée une nouvelle réservation
 * @param {Object} reservationData - Données de la réservation
 * @param {number} reservationData.catwayNumber - Numéro du catway
 * @param {string} reservationData.clientName - Nom du client
 * @param {string} reservationData.boatName - Nom du bateau
 * @param {string|Date} reservationData.checkIn - Date d'arrivée
 * @param {string|Date} reservationData.checkOut - Date de départ
 * @returns {Promise<Object>} Réservation créée
 * @throws {Error} Erreur lors de la création (validation, etc.)
 */
const createReservation = async (reservationData) => {
    try {
        const newReservation = new Reservation({
            catwayNumber: reservationData.catwayNumber,
            clientName: reservationData.clientName,
            boatName: reservationData.boatName,
            checkIn: reservationData.checkIn,
            checkOut: reservationData.checkOut
        });

        await newReservation.save();
        return newReservation;
    } catch (error) {
        throw error;
    }
};

/**
 * Supprime une réservation
 * @param {string} id - Identifiant MongoDB de la réservation
 * @returns {Promise<Object>} Message de confirmation
 * @returns {string} return.message - "Réservation supprimée"
 * @throws {Error} "Réservation non trouvée" si l'ID n'existe pas
 */
const deleteReservation = async (id) => {
    try {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            throw new Error("Réservation non trouvée");
        }

        await Reservation.findByIdAndDelete(id);
        return { message: "Réservation supprimée" };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getReservationsByCatway,
    getReservationById,
    createReservation,
    deleteReservation,
};