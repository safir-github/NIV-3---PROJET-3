const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes pour les réservations d'un catway
router.get('/catways/:catwayNumber/reservations', authMiddleware, reservationController.getReservationsByCatway);
router.post('/catways/:catwayNumber/reservations', authMiddleware, reservationController.createReservation);

// Routes directes pour les réservations (par ID)
router.get('/reservations/:id', authMiddleware, reservationController.getReservationById);
router.delete('/reservations/:id', authMiddleware, reservationController.deleteReservation);

module.exports = router;
