const Reservation = require("../models/reservation");

const getReservationsByCatway = async (catwayNumber) => {
    try {
        const reservations = await Reservation.find({ catwayNumber });
        return reservations;
    } catch (error) {
        throw error;
    }
};

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