const Catway = require("../models/catway");




const getAllCatways = async () => {
    try {
        const catways = await Catway.find();


        return catways;

    } catch (error) {
        throw error;
    }
};




const getCatwayById = async (id) => {
    try {
        const catway = await Catway.findById(id);

        if (!catway) {
            throw new Error("Catway non trouvé");
        }

        return catway;

    } catch (error) {
        throw error;
    }
};




const createCatway = async (catwayData) => {
    try {

        const newCatway = new Catway({
            catwayNumber: catwayData.catwayNumber,
            type: catwayData.type,
            catwayState: catwayData.catwayState
        });

        await newCatway.save();

        return newCatway;

    } catch (error) {
        throw error;
    }
};





const updateCatway = async (id, catwayData) => {
    try {

        const catway = await Catway.findById(id);

        if (!catway) {
            throw new Error("Catway non trouvé");
        }

        const updateData = {
            catwayNumber: catwayData.catwayNumber,
            type: catwayData.type,
            catwayState: catwayData.catwayState
        };



        const updatedCatway = await Catway.findByIdAndUpdate(id, updateData, { new: true });

        return updatedCatway;

    } catch (error) {
        throw error;
    }
};



const patchCatway = async (id, catwayData) => {
    try {

        const catway = await Catway.findById(id);

        if (!catway) {
            throw new Error("Catway non trouvé");
        }

        const updateData = {};

        if (catwayData.catwayNumber !== undefined) {
            updateData.catwayNumber = catwayData.catwayNumber;
        }

        if (catwayData.type !== undefined) {
            updateData.type = catwayData.type;
        }

        if (catwayData.catwayState !== undefined) {
            updateData.catwayState = catwayData.catwayState;
        }

        const updatedCatway = await Catway.findByIdAndUpdate(id, updateData, { new: true });

        return updatedCatway;

    } catch (error) {
        throw error;
    }
};



const deleteCatway = async (id) => {
    try {

        const catway = await Catway.findById(id);

        if (!catway) {
            throw new Error("Catway non trouvé");
        }

        await Catway.findByIdAndDelete(id);
        return { message: "Catway supprimé" };

    } catch (error) {
        throw error;
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