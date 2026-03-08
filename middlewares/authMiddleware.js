const jwt = require("jsonwebtoken");





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