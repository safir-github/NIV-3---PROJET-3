const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

router.get("/catways", catwayController.getAllCatways);
router.get("/catways/:id", catwayController.getCatwayById);
router.post("/catways", catwayController.createCatway);
router.put("/catways/:id", catwayController.updateCatway);
router.patch("/catways/:id", catwayController.patchCatway);
router.delete("/catways/:id", catwayController.deleteCatway);

// Routes pour les réservations (sous-ressource)
router.get('/catways/:catwayNumber/reservations', reservationController.getReservationsByCatway);
router.get('/catways/:catwayNumber/reservations/:id', reservationController.getReservationById);
router.post('/catways/:catwayNumber/reservations', reservationController.createReservation);
router.delete('/catways/:catwayNumber/reservations/:id', reservationController.deleteReservation);


module.exports = router;