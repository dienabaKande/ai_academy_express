// Imports
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("dotenv").config();

// Contrôleurs
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

// Routes centralisées
const routes = require("./routes/index");

// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});
db.on("error", (err) => {
  console.error("❌ Erreur de connexion à MongoDB :", err);
});

// App Express
const app = express();

// Configuration de base
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// Sessions & Flash
app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 4000000 },
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Authentification avec Passport
const User = require("./models/user");
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Variables globales accessibles dans toutes les vues
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Logs de requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Utilisation des routes centralisées
app.use("/", routes);

// Erreurs
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Démarrage du serveur
const PORT = app.get("port");
app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});
