import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './CourseList.css'; 
 
const CourseList = ({ courses }) => { 
  // Si courses n'est pas défini, utiliser un tableau vide 
  const courseData = courses || []; 
 
  return ( 
    <div className="course-list"> 
      <h2>Nos Cours</h2> 
      <p>Découvrez notre sélection de cours d'intelligence artificielle.</p> 
      <div className="courses-container"> 
        {courseData.map(course => ( 
          <div className="course-card" key={course.id}> 
            <h3>{course.title}</h3> 
            <p>{course.description}</p> 
            <div className="course-details"> 
              <span className="price">{course.price} €</span> 
              <span className="level">{course.level}</span> 
            </div> 
            <Link to={`/courses/${course.id}`} className="btn"> 
              Voir les détails 
            </Link> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
}; 
 
export default CourseList;