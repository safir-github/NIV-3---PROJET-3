const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");

router.get("/catways", catwayController.getAllCatways);
router.get("/catways/:id", catwayController.getCatwayById);
router.post("/catways", catwayController.createCatway);
router.put("/catways/:id", catwayController.updateCatway);
router.patch("/catways/:id", catwayController.patchCatway);
router.delete("/catways/:id", catwayController.deleteCatway);

module.exports = router;