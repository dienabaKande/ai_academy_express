const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken");
const token_key = process.env.TOKEN_KEY || "secretTokenKey";

const getUserParams = body => ({
  name: {
    first: body.first,
    last: body.last
  },
  email: body.email,
  password: body.password,
  zipCode: body.zipCode
});

module.exports = {
  index: (req, res, next) => {
    User.find({})
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index", {
      pageTitle: "Liste des utilisateurs"
    });
  },

  new: (req, res) => {
    res.render("users/new", {
      pageTitle: "Créer un utilisateur"
    });
  },

  create: (req, res, next) => {
    console.log("✅ Données POST :", req.body);
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.error(`Erreur création utilisateur : ${error.message}`);
        res.locals.redirect = "/users/new";
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Erreur show utilisateur: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show", {
      pageTitle: `Profil de ${res.locals.user.fullName}`
    });
  },

  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user,
          pageTitle: `Modifier ${user.fullName}`
        });
      })
      .catch(error => {
        console.log(`Erreur edition utilisateur: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id,
        userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, { $set: userParams })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Erreur update utilisateur: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Erreur suppression utilisateur: ${error.message}`);
        next(error);
      });
  },validate: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      req.flash("error", "Email et mot de passe requis.");
      res.locals.redirect = "/users/new";
      return next(new Error("Validation échouée"));
    }
    next();
  },  

  getApiToken: (req, res) => {
    if (req.user) {
    let signedToken = jsonWebToken.sign(
    {
    data: req.user._id,
    exp: new Date().setDate(new Date().getDate() + 30) // Token valable 30 jours
    },
    token_key
    );
   
    res.render("users/api-token", {
    token: signedToken
    });
    } else {
    req.flash("error", "Vous devez être connecté pour obtenir un token API.");
    res.redirect("/login");
    }
  }

};
