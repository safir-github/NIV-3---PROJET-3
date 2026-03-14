/**
 * Fichier principal de l'application Express
 * @module app
 * @description Configure et lance le serveur Express avec toutes les routes et middlewares
 */

require('dotenv').config(); // Charge les variables du .env
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// CORS pour permettre les requêtes depuis le navigateur
app.use(require('cors')());

// Servir les fichiers statiques du dossier public
app.use(express.static('public'));

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du Port de Plaisance Russell !');
});

// Routes de l'API
app.use('/api', userRoutes);
app.use('/api', catwayRoutes);
app.use('/api', reservationRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});