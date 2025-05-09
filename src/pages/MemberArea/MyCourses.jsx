import React from 'react'; 
const MyCourses = () => { 
  return ( 
    <div className="my-courses"> 
      <h1>Mes Cours</h1> 
       
      <div className="course-filters"> 
        <button className="btn btn-small active">Tous</button> 
        <button className="btn btn-small">En cours</button> 
        <button className="btn btn-small">Terminés</button> 
      </div> 
       
      <div className="member-courses-list"> 
        <div className="member-course-item"> 
          <div className="course-info"> 
            <h3>Introduction à l'IA</h3> 
            <div className="progress-container"> 
              <div className="progress-bar" style={{ width: '75%' }}></div> 
              <span className="progress-text">75% terminé</span> 
            </div> 
          </div> 
          <button className="btn">Continuer</button> 
        </div> 
         
        <div className="member-course-item"> 
          <div className="course-info"> 
            <h3>Machine Learning Fondamental</h3> 
            <div className="progress-container"> 
              <div className="progress-bar" style={{ width: '30%' }}></div> 
              <span className="progress-text">30% terminé</span> 
            </div> 
          </div> 
          <button className="btn">Continuer</button> 
        </div> 
         
        <div className="member-course-item"> 
          <div className="course-info"> 
            <h3>Éthique de l'IA</h3> 
            <div className="progress-container"> 
              <div className="progress-bar" style={{ width: '100%' }}></div> 
              <span className="progress-text">Terminé</span> 
            </div> 
          </div> 
          <button className="btn">Revoir</button> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
export default MyCourses;