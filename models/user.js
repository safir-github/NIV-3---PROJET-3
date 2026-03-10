const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les utilisateurs
 * @typedef {Object} User
 * @property {string} name - Nom de l'utilisateur (requis)
 * @property {string} email - Email unique de l'utilisateur (requis, converti en minuscules)
 * @property {string} password - Mot de passe hashé de l'utilisateur (requis, jamais retourné dans les réponses API)
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
