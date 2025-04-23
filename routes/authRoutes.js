const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

// Connexion
router.get("/login", authController.login);
router.post("/login", authController.authenticate);

// Déconnexion
router.get("/logout", authController.logout, usersController.redirectView);

// Inscription
router.get("/signup", authController.signup);
router.post("/signup", authController.register, usersController.redirectView);

module.exports = router;
