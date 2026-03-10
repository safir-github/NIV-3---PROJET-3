const reservationService = require("../services/reservationService");

const getReservationsByCatway = async (req, res) => {
    try {
        const catwayNumber = parseInt(req.params.catwayNumber);
        const reservations = await reservationService.getReservationsByCatway(catwayNumber);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReservationById = async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await reservationService.getReservationById(id);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const createReservation = async (req, res) => {
    try {
        const catwayNumber = parseInt(req.params.catwayNumber);
        const reservationData = {
            ...req.body,
            catwayNumber
        };
        const newReservation = await reservationService.createReservation(reservationData);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await reservationService.deleteReservation(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getReservationsByCatway,
    getReservationById,
    createReservation,
    deleteReservation,
};
