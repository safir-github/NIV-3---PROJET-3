/**
 * Routes pour la gestion des catways et de leurs réservations
 * @module routes/catwayRoutes
 * @description Définit toutes les routes HTTP pour les opérations CRUD sur les catways et les réservations associées
 */

const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

// ==================== Routes Catways ====================

/**
 * @route   GET /api/catways
 * @desc    Obtenir tous les catways
 * @access  Privé (nécessite authentification)
 */
router.get("/catways", catwayController.getAllCatways);

/**
 * @route   GET /api/catways/:id
 * @desc    Obtenir un catway par son ID
 * @access  Privé (nécessite authentification)
 */
router.get("/catways/:id", catwayController.getCatwayById);

/**
 * @route   POST /api/catways
 * @desc    Créer un nouveau catway
 * @access  Privé (nécessite authentification)
 */
router.post("/catways", catwayController.createCatway);

/**
 * @route   PUT /api/catways/:id
 * @desc    Remplacer entièrement un catway
 * @access  Privé (nécessite authentification)
 */
router.put("/catways/:id", catwayController.updateCatway);

/**
 * @route   PATCH /api/catways/:id
 * @desc    Modifier partiellement un catway
 * @access  Privé (nécessite authentification)
 */
router.patch("/catways/:id", catwayController.patchCatway);

/**
 * @route   DELETE /api/catways/:id
 * @desc    Supprimer un catway
 * @access  Privé (nécessite authentification)
 */
router.delete("/catways/:id", catwayController.deleteCatway);

// ==================== Routes Réservations (sous-ressource) ====================

/**
 * @route   GET /api/catways/:catwayNumber/reservations
 * @desc    Obtenir toutes les réservations d'un catway
 * @access  Privé (nécessite authentification)
 */
router.get('/catways/:catwayNumber/reservations', reservationController.getReservationsByCatway);

/**
 * @route   GET /api/catways/:catwayNumber/reservations/:id
 * @desc    Obtenir une réservation spécifique d'un catway
 * @access  Privé (nécessite authentification)
 */
router.get('/catways/:catwayNumber/reservations/:id', reservationController.getReservationById);

/**
 * @route   POST /api/catways/:catwayNumber/reservations
 * @desc    Créer une nouvelle réservation sur un catway
 * @access  Privé (nécessite authentification)
 */
router.post('/catways/:catwayNumber/reservations', reservationController.createReservation);

/**
 * @route   DELETE /api/catways/:catwayNumber/reservations/:id
 * @desc    Supprimer une réservation
 * @access  Privé (nécessite authentification)
 */
router.delete('/catways/:catwayNumber/reservations/:id', reservationController.deleteReservation);

module.exports = router;