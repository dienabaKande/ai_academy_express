import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList';
import Counter from '../components/Counter';
import './HomePage.css';

const HomePage = ({ courses }) => {
  const navigate = useNavigate();

  // Fonction pour naviguer vers la page des cours
  const goToCourses = () => {
    navigate('/courses');
  };

  return (
    <main className="main-content">
      <div className="hero">
        <h2>Bienvenue à AI Academy</h2>
        <p>
          Découvrez nos cours sur l'intelligence artificielle et commencez votre voyage dans le monde de l'IA.
        </p>
        <button className="btn" onClick={goToCourses}>Voir nos cours</button>
      </div>

      <section className="features">
        <h2>Pourquoi choisir AI Academy?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Experts du domaine</h3>
            <p>Apprenez avec des instructeurs experts en IA et machine learning.</p>
          </div>
          <div className="feature-card">
            <h3>Contenu à jour</h3>
            <p>Notre contenu est régulièrement mis à jour pour suivre les dernières tendances.</p>
          </div>
          <div className="feature-card">
            <h3>Projets pratiques</h3>
            <p>Consolidez vos connaissances avec des projets réels et des exercices pratiques.</p>
          </div>
        </div>
      </section>

      <CourseList courses={courses} />

      <div className="demo-section">
        <h2>Démonstration des concepts React</h2>
        <p>
          Cette section illustre les concepts fondamentaux de React comme les états (state) et les props.
        </p>

        <div className="counters">
          <Counter initialValue={5} label="Étudiants inscrits aujourd'hui" />
          <Counter label="Cours complétés" />
        </div>
        <div className="concept-explanation">
          <h3>Flux de données dans React</h3>
          <p>
            React utilise un flux de données unidirectionnel : les données descendent de composants parents
            vers des composants enfants via les props, et remontent via des fonctions de rappel.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;