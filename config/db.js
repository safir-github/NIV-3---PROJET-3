/**
 * Configuration de la connexion à MongoDB
 * @module config/db
 * @description Établit la connexion à MongoDB avec Mongoose
 */

const mongoose = require('mongoose');

/**
 * Connecte à MongoDB
 * @async
 * @function connectDB
 * @returns {Promise<void>} Promesse qui se résout lorsque la connexion est établie
 * @throws {Error} Si la connexion échoue
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connecté');
    } catch (error) {
        console.error('❌ Erreur de connexion :', error.message);
    }
};

module.exports = connectDB;