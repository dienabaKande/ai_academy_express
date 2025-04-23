const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errorController");

// Middleware 404
router.use(errorController.pageNotFoundError);

// Middleware 500
router.use(errorController.internalServerError);

module.exports = router;
