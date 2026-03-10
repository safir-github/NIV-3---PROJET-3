const catwayService = require("../services/catwayService");


const getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getCatwayById = async (req, res) => {
    try {

        const id = req.params.id;
        const catway = await catwayService.getCatwayById(id);
        res.status(200).json(catway);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};



const createCatway = async (req, res) => {
    try {
        const catwayData = req.body;
        const newCatway = await catwayService.createCatway(catwayData);
        res.status(201).json(newCatway);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const updateCatway = async (req, res) => {
    try {

        const id = req.params.id;
        const catwayData = req.body;
        const updatedCatway = await catwayService.updateCatway(id, catwayData);
        res.status(200).json(updatedCatway);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const patchCatway = async (req, res) => {
    try {
        const id = req.params.id;
        const catwayData = req.body;
        const patchedCatway = await catwayService.patchCatway(id, catwayData);
        res.status(200).json(patchedCatway);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const deleteCatway = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCatway = await catwayService.deleteCatway(id);
        res.status(200).json(deletedCatway);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    getAllCatways,
    getCatwayById,
    createCatway,
    updateCatway,
    patchCatway,
    deleteCatway,
};
