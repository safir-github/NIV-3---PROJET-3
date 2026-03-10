require('dotenv').config(); // Charge les variables du .env
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const catwayRoutes = require('./routes/catwayRoutes');

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API du Port de Plaisance Russell !');
});

// Routes de l'API
app.use('/api', userRoutes);
app.use('/api', catwayRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});