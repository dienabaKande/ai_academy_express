import React, { useState } from 'react'; 
import './ContactPage.css'; 
 
const ContactPage = () => { 
  // État pour les valeurs du formulaire 
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  }); 
   
  // État pour les messages de succès/erreur 
  const [formStatus, setFormStatus] = useState({ 
    submitted: false, 
    error: false, 
    message: '' 
  }); 
   
  // Gérer les changements dans les champs du formulaire 
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(prevData => ({ 
      ...prevData, 
      [name]: value 
    })); 
  }; 
   
  // Gérer la soumission du formulaire 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
     
    // Validation simple 
    if (!formData.name || !formData.email || !formData.message) { 
      setFormStatus({ 
        submitted: false, 
        error: true, 
        message: 'Veuillez remplir tous les champs obligatoires.' 
      }); 
      return; 
    } 
     
    // Simuler un envoi de formulaire réussi 
    console.log('Données du formulaire soumises:', formData); 
     
    // Réinitialiser le formulaire et afficher un message de succès 
    setFormData({ 
      name: '', 
      email: '', 
      subject: '', 
      message: '' 
    }); 
     
    setFormStatus({ 
      submitted: true, 
      error: false, 
      message: 'Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.' 
    }); 
  }; 
   
  return ( 
    <main className="main-content"> 
      <h1>Contactez-nous</h1> 
       
      <div className="contact-container"> 
        <div className="contact-info"> 
          <h2>Informations de contact</h2> 
          <p>N'hésitez pas à nous contacter pour toute question concernant nos cours, notre 
plateforme ou pour des renseignements sur mesure.</p> 
           
          <div className="contact-details"> 
            <div className="contact-item"> 
              <h3>Adresse</h3> 
              <p>123 Avenue de l'Innovation<br />75001 Paris, France</p> 
            </div> 
             
            <div className="contact-item"> 
              <h3>Email</h3> 
              <p>info@aiacademy.fr</p> 
            </div> 
             
            <div className="contact-item"> 
              <h3>Téléphone</h3> 
              <p>+33 1 23 45 67 89</p> 
            </div> 
             
            <div className="contact-item"> 
              <h3>Horaires</h3> 
              <p>Lundi - Vendredi: 9h - 18h<br />Samedi: 10h - 15h</p> 
            </div> 
          </div> 
        </div> 
         
        <div className="contact-form-container"> 
          <h2>Envoyez-nous un message</h2> 
           
          {formStatus.submitted && ( 
            <div className="form-success"> 
              {formStatus.message} 
            </div> 
          )} 
           
          {formStatus.error && ( 
            <div className="form-error"> 
              {formStatus.message} 
            </div> 
          )} 
           
          <form className="contact-form" onSubmit={handleSubmit}> 
            <div className="form-group"> 
              <label htmlFor="name">Nom complet *</label> 
              <input  
                type="text"  
                id="name"  
                name="name"  
                value={formData.name}  
                onChange={handleChange}  
                required 
              /> 
            </div> 
             
            <div className="form-group"> 
              <label htmlFor="email">Email *</label> 
              <input  
                type="email"  
                id="email"  
                name="email"  
                value={formData.email}  
                onChange={handleChange}  
                required 
              /> 
            </div> 
             
            <div className="form-group"> 
              <label htmlFor="subject">Sujet</label> 
              <input  
                type="text"  
                id="subject"  
                name="subject"  
                value={formData.subject}  
                onChange={handleChange} 
              /> 
            </div> 
             
            <div className="form-group"> 
              <label htmlFor="message">Message *</label> 
              <textarea  
                id="message"  
                name="message"  
                rows="5"  
                value={formData.message}  
                onChange={handleChange}  
                required 
              ></textarea> 
            </div> 
             
            <button type="submit" className="btn">Envoyer</button> 
          </form> 
        </div> 
      </div> 
    </main> 
  ); 
}; 
 
export default ContactPage; 