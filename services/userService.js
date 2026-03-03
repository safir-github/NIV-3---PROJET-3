const User = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};




const getUserById = async (id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        return user;
    } catch (error) {
        throw error;
    }
};




const createUser = async (userData) => {
    try {

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        });

        await newUser.save();

        const userObject = newUser.toObject();
        delete userObject.password;
        return userObject;

    } catch (error) {
        throw error;
    }
};



const updateUser = async (id, userData) => {
    try {

        const user = await User.findById(id);

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        const updateData = {
            name: userData.name,
            email: userData.email
        };

        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        const userObject = updatedUser.toObject();
        delete userObject.password;
        return userObject;

    } catch (error) {
        throw error;
    }
};




const deleteUser = async (id) => {
    try {

        const user = await User.findById(id);

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        await User.findByIdAndDelete(id);
        return { message: "Utilisateur supprimé" };

    } catch (error) {
        throw error;
    }
};




const authenticateUser = async (email, password) => {
    try {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const userObject = user.toObject();
        delete userObject.password;
        return userObject;

    } catch (error) {
        throw error;
    }
};




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
};