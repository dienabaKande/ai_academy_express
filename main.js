const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("dotenv").config();

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const authController = require("./controllers/authController");

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

const app = express();

// Config Express
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

// Passport
const User = require("./models/user");
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Variables globales
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes authentification
app.get("/login", authController.login);
app.post("/login", authController.authenticate);
app.get("/logout", authController.logout, usersController.redirectView);
app.get("/signup", authController.signup);
app.post("/signup", authController.register, usersController.redirectView);

// Routes utilisateurs (protégées)
app.get("/users", authController.ensureLoggedIn, usersController.index, usersController.indexView);
app.get("/users/new", authController.ensureLoggedIn, usersController.new);
app.post("/users/create", authController.ensureLoggedIn, usersController.create, usersController.redirectView);
app.get("/users/:id", authController.ensureLoggedIn, usersController.show, usersController.showView);
app.get("/users/:id/edit", authController.ensureLoggedIn, usersController.edit);
app.put("/users/:id/update", authController.ensureLoggedIn, usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", authController.ensureLoggedIn, usersController.delete, usersController.redirectView);

// Routes cours (protégées pour création/modif)
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", authController.ensureLoggedIn, coursesController.new);
app.post("/courses/create", authController.ensureLoggedIn, coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", authController.ensureLoggedIn, coursesController.edit);
app.put("/courses/:id/update", authController.ensureLoggedIn, coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", authController.ensureLoggedIn, coursesController.delete, coursesController.redirectView);

// Autres routes
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);
app.get("/faq", (req, res) => res.render("faq", { pageTitle: "FAQ" }));

// Abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);

// Test route
app.get("/test", (req, res) => {
  try {
    res.send("Test réussi");
  } catch (error) {
    console.error("Erreur test:", error);
    res.status(500).send("Erreur test");
  }
});

// Logs & erreurs
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Lancement serveur
const PORT = app.get("port");
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});
