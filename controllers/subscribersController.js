const Subscriber = require("../models/subscriber");

const getSubscriberParams = body => ({
  name: body.name,
  email: body.email,
  zipCode: body.zipCode
});

module.exports = {
  index: (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération des abonnés: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("subscribers/index", {
      pageTitle: "Liste des abonnés"
    });
  },

  new: (req, res) => {
    res.render("subscribers/new", {
      pageTitle: "Nouvel abonnement"
    });
  },

  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la création: ${error.message}`);
        res.locals.redirect = "/subscribers/new";
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération d’un abonné: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show", {
      pageTitle: `Abonné ${res.locals.subscriber.name}`
    });
  },

  edit: (req, res, next) => {
    Subscriber.findById(req.params.id)
      .then(subscriber => {
        res.render("subscribers/edit", {
          subscriber: subscriber,
          pageTitle: `Modifier ${subscriber.name}`
        });
      })
      .catch(error => {
        console.log(`Erreur édition abonné: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let subscriberId = req.params.id,
        subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Erreur mise à jour abonné: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(`Erreur suppression abonné: ${error.message}`);
        next(error);
      });
  }
};
