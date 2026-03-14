/**
 * Routes pour la gestion des réservations
 * @module routes/reservationRoutes
 * @description Définit les routes HTTP pour accéder aux réservations par catway ou par ID direct
 */

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// ==================== Routes Réservations par Catway ====================

/**
 * @route   GET /api/catways/:catwayNumber/reservations
 * @desc    Obtenir toutes les réservations d'un catway spécifique
 * @access  Privé (nécessite authentification)
 * @param   {number} catwayNumber - Numéro du catway
 */
router.get('/catways/:catwayNumber/reservations', authMiddleware, reservationController.getReservationsByCatway);

/**
 * @route   POST /api/catways/:catwayNumber/reservations
 * @desc    Créer une nouvelle réservation sur un catway
 * @access  Privé (nécessite authentification)
 * @param   {number} catwayNumber - Numéro du catway
 */
router.post('/catways/:catwayNumber/reservations', authMiddleware, reservationController.createReservation);

// ==================== Routes Réservations par ID direct ====================

/**
 * @route   GET /api/reservations/:id
 * @desc    Obtenir une réservation par son ID direct
 * @access  Privé (nécessite authentification)
 * @param   {string} id - ID de la réservation
 */
router.get('/reservations/:id', authMiddleware, reservationController.getReservationById);

/**
 * @route   DELETE /api/reservations/:id
 * @desc    Supprimer une réservation par son ID
 * @access  Privé (nécessite authentification)
 * @param   {string} id - ID de la réservation
 */
router.delete('/reservations/:id', authMiddleware, reservationController.deleteReservation);

module.exports = router;
