const User = require("../models/user");
const Course = require("../models/course");
const Subscriber = require("../models/subscriber");
const httpStatus = require("http-status-codes");
const jsonWebToken = require("jsonwebtoken");
const passport = require("passport");

const token_key = process.env.TOKEN_KEY || "secretTokenKey";

module.exports = {
  verifyToken: (req, res, next) => {
    if (req.path === "/login") return next();

    let token = req.query.apiToken || req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    if (token) {
      jsonWebToken.verify(token, token_key, (error, payload) => {
        if (payload) {
          User.findById(payload.data).then(user => {
            if (user) {
              next();
            } else {
              res.status(httpStatus.FORBIDDEN).json({ error: true, message: "Aucun utilisateur trouvé." });
            }
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({ error: true, message: "Token invalide." });
        }
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({ error: true, message: "Token requis." });
    }
  },

  apiAuthenticate: (req, res, next) => {
    passport.authenticate("local", (error, user) => {
      if (user) {
        let signedToken = jsonWebToken.sign({ data: user._id, exp: new Date().setDate(new Date().getDate() + 1) }, token_key);
        res.json({
          success: true,
          token: signedToken,
          user: {
            id: user._id,
            name: user.fullName,
            email: user.email
          }
        });
      } else {
        res.json({ success: false, message: "Authentification échouée." });
      }
    })(req, res, next);
  },

  respondJSON: (req, res) => {
    res.json({ status: httpStatus.OK, data: res.locals });
  },

  errorJSON: (error, req, res, next) => {
    res.json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error ? error.message : "Erreur inconnue"
    });
  },

  // ==== Users ====
  getAllUsers: (req, res, next) => {
    User.find({})
      .then(users => { res.locals.users = users; next(); })
      .catch(next);
  },

  getUserById: (req, res, next) => {
    User.findById(req.params.id)
      .then(user => { res.locals.user = user; next(); })
      .catch(next);
  },

  createUser: (req, res, next) => {
    let userParams = {
      name: { first: req.body.first, last: req.body.last },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };

    User.register(new User(userParams), req.body.password)
      .then(user => { res.locals.user = user; res.locals.success = true; next(); })
      .catch(next);
  },

  updateUser: (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: {
        name: { first: req.body.first, last: req.body.last },
        email: req.body.email,
        zipCode: req.body.zipCode
      }
    }).then(user => { res.locals.user = user; res.locals.success = true; next(); })
      .catch(next);
  },

  deleteUser: (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => { res.locals.success = true; next(); })
      .catch(next);
  },

  // ==== Courses ====
  getAllCourses: (req, res, next) => {
    Course.find({})
      .then(courses => { res.locals.courses = courses; next(); })
      .catch(next);
  },

  getCourseById: (req, res, next) => {
    Course.findById(req.params.id)
      .then(course => { res.locals.course = course; next(); })
      .catch(next);
  },

  createCourse: (req, res, next) => {
    Course.create({
      title: req.body.title,
      description: req.body.description,
      maxStudents: req.body.maxStudents,
      cost: req.body.cost
    }).then(course => { res.locals.course = course; res.locals.success = true; next(); })
      .catch(next);
  },

  updateCourse: (req, res, next) => {
    Course.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        maxStudents: req.body.maxStudents,
        cost: req.body.cost
      }
    }).then(course => { res.locals.course = course; res.locals.success = true; next(); })
      .catch(next);
  },

  deleteCourse: (req, res, next) => {
    Course.findByIdAndRemove(req.params.id)
      .then(() => { res.locals.success = true; next(); })
      .catch(next);
  },

  // ==== Subscribers ====
  getAllSubscribers: (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => { res.locals.subscribers = subscribers; next(); })
      .catch(next);
  },

  getSubscriberById: (req, res, next) => {
    Subscriber.findById(req.params.id)
      .then(subscriber => { res.locals.subscriber = subscriber; next(); })
      .catch(next);
  },

  createSubscriber: (req, res, next) => {
    Subscriber.create({
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode
    }).then(subscriber => { res.locals.subscriber = subscriber; res.locals.success = true; next(); })
      .catch(next);
  },

  updateSubscriber: (req, res, next) => {
    Subscriber.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
      }
    }).then(subscriber => { res.locals.subscriber = subscriber; res.locals.success = true; next(); })
      .catch(next);
  },

  deleteSubscriber: (req, res, next) => {
    Subscriber.findByIdAndRemove(req.params.id)
      .then(() => { res.locals.success = true; next(); })
      .catch(next);
  }
};
