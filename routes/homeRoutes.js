const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Pages publiques
router.get("/", homeController.index);
router.get("/about", homeController.about);
router.get("/contact", homeController.contact);
router.post("/contact", homeController.processContact);
router.get("/faq", (req, res) => res.render("faq", { pageTitle: "FAQ" }));

module.exports = router;
