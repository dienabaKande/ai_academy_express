import React from 'react'; 
 
const Profile = () => { 
  return ( 
    <div className="profile"> 
      <h1>Mon Profil</h1> 
      <div className="profile-info"> 
        <div className="profile-avatar"> 
          <img src="https://via.placeholder.com/150" alt="Avatar" /> 
          <button className="btn btn-small">Modifier l'avatar</button> 
        </div> 
         
        <div className="profile-details"> 
          <div className="profile-group"> 
            <label>Nom complet</label> 
            <p>Diénaba Kande</p> 
          </div> 
           
          <div className="profile-group"> 
            <label>Email</label> 
            <p>dienabakande@gmail.com</p> 
          </div> 
           
          <div className="profile-group"> 
            <label>Membre depuis</label> 
            <p>Janvier 2023</p> 
          </div> 
           
          <div className="profile-group"> 
            <label>Niveau</label> 
            <p>Intermédiaire</p> 
          </div> 
           
          <button className="btn">Modifier le profil</button> 
        </div> 
      </div> 
    </div> 
  ); 
};                                                                                      
export default Profile;