import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import './CourseDetailPage.css';

const CourseDetailPage = ({ courses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer le filtre actif s'il existe dans l'état de localisation
  const activeFilter = location.state?.filter || 'all';

  // Trouver le cours correspondant à l'ID
  const course = courses.find(c => c.id === parseInt(id));

  // Si le cours n'existe pas, rediriger vers la page des cours
  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Cours non trouvé</h2>
        <p>Désolé, le cours que vous recherchez n'existe pas.</p>
        <Link to="/courses" className="btn">Voir tous les cours</Link>
      </div>
    );
  }

  // Fonction pour retourner à la liste des cours avec le filtre actif
  const goBack = () => {
    navigate('/courses', { state: { filter: activeFilter } });
  };

  return (
    <main className="main-content">
      <div className="course-detail">
        <button className="back-button" onClick={goBack}>
          &larr; Retour aux cours
        </button>

        <div className="course-header">
          <h1>{course.title}</h1>
          <div className="course-meta">
            <span className="level">{course.level}</span>
            <span className="price">{course.price} €</span>
          </div>
        </div>

        <div className="course-content">
          <section className="course-description">
            <h2>Description du cours</h2>
            <p>{course.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
              magna eu eros lacinia, ac dignissim nisl ultrices. Proin consectetur
              felis ut metus ultricies, at tincidunt massa gravida.
            </p>
          </section>

          <section className="course-curriculum">
            <h2>Programme du cours</h2>
            <div className="curriculum-modules">
              <div className="module">
                <h3>Module 1: Introduction</h3>
                <ul>
                  <li>Qu'est-ce que l'intelligence artificielle?</li>
                  <li>Histoire de l'IA</li>
                  <li>Applications modernes de l'IA</li>
                </ul>
              </div>

              <div className="module">
                <h3>Module 2: Fondamentaux</h3>
                <ul>
                  <li>Algorithmes et structures de données</li>
                  <li>Probabilités et statistiques</li>
                  <li>Optimisation</li>
                </ul>
              </div>

              <div className="module">
                <h3>Module 3: Projets pratiques</h3>
                <ul>
                  <li>Configuration de l'environnement</li>
                  <li>Projet guidé</li>
                  <li>Projet final</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="enroll-section">
          <h2>Prêt à commencer votre apprentissage?</h2>
          <button className="btn btn-large">S'inscrire maintenant</button>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailPage;
