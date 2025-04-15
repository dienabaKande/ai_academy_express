const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose"); // Ajout de Mongoose
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

// Configuration de la connexion à MongoDB
mongoose.connect(
"mongodb://localhost:27017/ai_academy",
{ useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
const db = mongoose.connection;
db.once("open", () => {
console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});
db.on("error", (err) => {
  console.error("❌ Erreur de connexion à MongoDB :", err);
});

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ajoutez les contrôleurs
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
// Ajouter le middleware method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method", {
methods: ["POST", "GET"]

}));
// Notification middleware
app.use((req, res, next) => {
  res.locals.notification = null;
  res.locals.pageTitle = "AI Academy"; // facultatif : titre par défaut
  next();
});
app.use(express.static("public"));

// Routes pour les utilisateurs
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
// Routes pour les cours
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));



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


// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});
