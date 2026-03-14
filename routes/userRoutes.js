/**
 * Routes pour la gestion des utilisateurs
 * @module routes/userRoutes
 * @description Définit toutes les routes HTTP pour les opérations CRUD sur les utilisateurs
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @route   GET /api/users
 * @desc    Obtenir tous les utilisateurs
 * @access  Privé (nécessite authentification)
 */
router.get("/users", authMiddleware, userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Obtenir un utilisateur par son ID
 * @access  Privé (nécessite authentification)
 */
router.get("/users/:id", authMiddleware, userController.getUserById);

/**
 * @route   POST /api/users
 * @desc    Créer un nouvel utilisateur
 * @access  Public
 */
router.post("/users", userController.createUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Mettre à jour un utilisateur
 * @access  Privé (nécessite authentification)
 */
router.put("/users/:id", authMiddleware, userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Supprimer un utilisateur
 * @access  Privé (nécessite authentification)
 */
router.delete("/users/:id", authMiddleware, userController.deleteUser);

/**
 * @route   POST /api/login
 * @desc    Connecter un utilisateur
 * @access  Public
 */
router.post("/login", userController.login);

module.exports = router;
