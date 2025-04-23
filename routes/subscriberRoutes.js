const express = require("express");
const router = express.Router();

const subscribersController = require("../controllers/subscribersController");
const authController = require("../controllers/authController");

// Auth obligatoire pour toutes les routes
router.use(authController.ensureLoggedIn);

// Liste des abonnés
router.get("/", subscribersController.index, subscribersController.indexView);

// Nouveau formulaire
router.get("/new", subscribersController.new);

// Création
router.post("/create", subscribersController.create, subscribersController.redirectView);

// Détail
router.get("/:id", subscribersController.show, subscribersController.showView);

// Édition
router.get("/:id/edit", subscribersController.edit);
router.put("/:id/update", subscribersController.update, subscribersController.redirectView);

// Suppression
router.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView);

module.exports = router;
