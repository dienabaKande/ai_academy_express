const courses = [
  {
    title: "Introduction à l'IA",
    description: "Découvrez les fondamentaux de l'intelligence artificielle.",
    price: 199,
    level: "Débutant"
  },
  {
    title: "Machine Learning Fondamental",
    description: "Apprenez les principes du machine learning et les algorithmes de base.",
    price: 299,
    level: "Intermédiaire"
  },
  {
    title: "Deep Learning Avancé",
    description: "Maîtrisez les réseaux de neurones profonds et leurs applications.",
    price: 399,
    level: "Avancé"
  }
];

exports.index = (req, res) => {
  res.render("index", { pageTitle: "Accueil" });
};

exports.about = (req, res) => {
  res.render("about", { pageTitle: "À propos" });
};

exports.courses = (req, res) => {
  let filteredCourses = courses;
  const { level, maxPrice } = req.query;

  if (level) {
    filteredCourses = filteredCourses.filter(course => course.level === level);
  }
  if (maxPrice) {
    filteredCourses = filteredCourses.filter(course => course.price <= parseFloat(maxPrice));
  }

  res.render("courses", {
    pageTitle: "Nos Cours",
    courses: filteredCourses
  });
};

exports.contact = (req, res) => {
  res.render("contact", { pageTitle: "Contact" });
};

exports.processContact = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.locals.notification = { type: 'error', message: "Nom et email sont obligatoires." };
    return res.render("contact", { pageTitle: "Contact" });
  }

  res.locals.notification = { type: 'success', message: "Votre message a été envoyé avec succès !" };
  res.render("thanks", {
    pageTitle: "Merci",
    formData: req.body
  });
};
