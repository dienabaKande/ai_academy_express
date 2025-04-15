const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose"); // Ajout de Mongoose
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

// Configuration de la connexion à MongoDB
mongoose.connect(
"mongodb://localhost:27017/ai_academy",
{ useNewUrlParser: true }
);

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Notification middleware
app.use((req, res, next) => {
  res.locals.notification = null;
  next();
});

// Routes
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/courses", homeController.courses);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);
app.get("/faq", (req, res) => {
  res.render("faq", { pageTitle: "FAQ" });
});
// Routes pour les abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.get('/test', (req, res) => {
  try {
    res.send('Test réussi');
  } catch (error) {
    console.error('Erreur test:', error);
    res.status(500).send('Erreur test');
  }
});
// Error handlers
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

const db = mongoose.connection;
db.once("open", () => {
console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});
// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});
