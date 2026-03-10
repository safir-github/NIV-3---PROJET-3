const jwt = require("jsonwebtoken");

/**
 * Middleware d'authentification JWT
 * Vérifie la présence et la validité du token JWT dans le header Authorization
 * @param {Object} req - Requête Express
 * @param {Object} req.headers - Headers de la requête
 * @param {string} [req.headers.Authorization] - Token JWT au format "Bearer <token>"
 * @param {string} req.userId - ID de l'utilisateur extrait du token (ajouté par le middleware)
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction pour passer au middleware suivant
 * @returns {Promise<void>} Envoie une erreur 401 si le token est manquant ou invalide, sinon appelle next()
 */
const authMiddleware = async (req, res, next) => {
    try {
        // 1. Récupérer le token depuis le header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // 2. Vérifier que le token existe
        if (!token) {
            return res.status(401).json({ error: "Accès non autorisé - Token manquant" });
        }

        // 3. Décoder et vérifier le token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Extraire l'ID utilisateur
        // 5. Ajouter l'ID à req
        req.userId = decodedToken.userId;

        // 6. Passer au suivant (next)
        next();
    } catch (error) {
        res.status(401).json({ error: "Accès non autorisé - Token invalide" });
    }
};

module.exports = authMiddleware;
