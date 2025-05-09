import React, { useState } from 'react'; 
 
const Settings = () => { 
  const [notifications, setNotifications] = useState({ 
    email: true, 
    newCourses: false, 
    promotions: true 
  }); 
  const handleNotificationChange = (type) => { 
    setNotifications(prev => ({ 
      ...prev, 
      [type]: !prev[type] 
    })); 
  }; 
  return ( 
    <div className="settings"> 
      <h1>Paramètres</h1> 
       
      <section className="settings-section"> 
        <h2>Paramètres du compte</h2> 
        <div className="settings-options"> 
          <div className="settings-option"> 
            <h3>Changer le mot de passe</h3> 
            <button className="btn btn-small">Modifier</button> 
          </div> 
          <div className="settings-option"> 
            <h3>Télécharger mes données</h3> 
            <button className="btn btn-small">Télécharger</button> 
          </div> 
           
          <div className="settings-option danger"> 
            <h3>Supprimer mon compte</h3> 
            <button className="btn btn-small btn-danger">Supprimer</button>  
          </div> 
        </div> 
      </section> 
       
      <section className="settings-section"> 
        <h2>Notifications</h2> 
        <div className="notification-settings"> 
          <div className="notification-option"> 
            <label htmlFor="email-notif">Notifications par email</label> 
            <input  
              type="checkbox"  
              id="email-notif"  
              checked={notifications.email}  
              onChange={() => handleNotificationChange('email')}  
            /> 
          </div> 
           
          <div className="notification-option"> 
            <label htmlFor="new-courses">Nouveaux cours disponibles</label> 
            <input  
              type="checkbox"  
              id="new-courses"  
              checked={notifications.newCourses}  
              onChange={() => handleNotificationChange('newCourses')}  
            /> 
          </div> 
           
          <div className="notification-option"> 
            <label htmlFor="promotions">Offres spéciales et promotions</label> 
            <input  
              type="checkbox"  
              id="promotions"  
              checked={notifications.promotions}  
              onChange={() => handleNotificationChange('promotions')}  
            /> 
          </div> 
        </div> 
      </section> 
    </div> 
  ); 
}; 
export default Settings;