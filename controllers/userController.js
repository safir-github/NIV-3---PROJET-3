const userService = require("../services/userService");



const getAllUsers = async (req, res) => {
    try {

        const users = await userService.getAllUsers();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};



const getUserById = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};




const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const updateUser = async (req, res) => {
    try {

        const id = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUser(id, userData);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userService.deleteUser(id);
        res.status(200).json(deletedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.authenticateUser(email, password);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
};