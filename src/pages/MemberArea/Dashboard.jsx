// src/pages/MemberArea/Dashboard.js 
import React from 'react'; 
 
const Dashboard = () => { 
  return ( 
    <div className="dashboard"> 
      <h1>Tableau de bord</h1> 
      <div className="dashboard-stats"> 
        <div className="stat-card"> 
          <h3>3</h3> 
          <p>Cours en cours</p> 
        </div> 
        <div className="stat-card"> 
          <h3>12</h3> 
          <p>Leçons terminées</p> 
        </div> 
        <div className="stat-card"> 
          <h3>5</h3> 
          <p>Certificats obtenus</p> 
        </div> 
      </div> 
       
      <div className="recent-activity"> 
        <h2>Activité récente</h2> 
        <ul className="activity-list"> 
          <li> 
            <span className="activity-date">Hier</span> 
            <span className="activity-desc">Leçon complétée: Introduction aux réseaux de 
neurones</span> 
          </li> 
          <li> 
            <span className="activity-date">Il y a 3 jours</span> 
            <span className="activity-desc">Quiz réussi: Fondamentaux de l'IA</span> 
          </li> 
          <li> 
            <span className="activity-date">La semaine dernière</span> 
            <span className="activity-desc">Cours commencé: Deep Learning Avancé</span> 
          </li> 
        </ul> 
      </div> 
    </div> 
  ); 
}; 
 
export default Dashboard;