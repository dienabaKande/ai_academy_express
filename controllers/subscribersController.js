const Subscriber = require("../models/subscriber");
exports.getAllSubscribers = (req, res, next) => {
Subscriber.find({})
.exec()
.then(subscribers => {
res.render("subscribers/index", {
subscribers: subscribers
});
})
.catch(error => {
console.log(`Erreur lors de la récupération des abonnés: ${error.message}`);
next(error);
});
};
exports.getSubscriptionPage = (req, res) => {
res.render("subscribers/new");
};
exports.saveSubscriber = (req, res) => {
let newSubscriber = new Subscriber({
name: req.body.name,
email: req.body.email,
zipCode: req.body.zipCode
});
newSubscriber.save()
.then(result => {
res.render("subscribers/thanks");
})
.catch(error => {
if (error) res.send(error);
});
};
exports.show = (req, res, next) => {
let subscriberId = req.params.id;
Subscriber.findById(subscriberId)
.then(subscriber => {
res.render("subscribers/show", {
subscriber: subscriber
});
})
.catch(error => {
console.log(`Erreur lors de la récupération d'un abonné par ID: ${error.message}`);

next(error);
});
};