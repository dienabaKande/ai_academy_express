
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
// Token API
router.get("/api-token", usersController.getApiToken);

// Toutes les routes ci-dessous nécessitent une authentification
router.use(authController.ensureLoggedIn);

// Afficher tous les utilisateurs
router.get("/", usersController.index, usersController.indexView);

// Formulaire de création
router.get("/new", usersController.new);

// Création d'utilisateur avec validation
router.post("/create", usersController.validate, usersController.create, usersController.redirectView);

// Détail d'un utilisateur
router.get("/:id", usersController.show, usersController.showView);

// Édition
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);

// Suppression
router.delete("/:id/delete", usersController.delete, usersController.redirectView);


module.exports = router;
