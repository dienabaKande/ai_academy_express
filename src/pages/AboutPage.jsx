import React from 'react'; 
import './AboutPage.css'; 
 
const AboutPage = () => { 
  return ( 
    <main className="main-content"> 
      <h1>À propos d'AI Academy</h1> 
       
      <section className="about-section"> 
        <h2>Notre mission</h2> 
        <p> 
          AI Academy est née de la conviction que l'intelligence artificielle transformera tous les 
aspects  
          de notre société. Notre mission est de rendre l'apprentissage de l'IA accessible à tous,  
          quel que soit votre niveau technique ou votre parcours. 
        </p> 
      </section> 
       
      <section className="about-section"> 
        <h2>Notre histoire</h2> 
        <p> 
          Fondée en 2020 par un groupe d'experts en IA et d'éducateurs passionnés, AI Academy  
          a commencé comme une série d'ateliers dans quelques grandes villes. Face à la demande  
          croissante, nous avons développé notre plateforme en ligne pour atteindre des apprenants  
          du monde entier. 
        </p> 
      </section> 
       
      <section className="about-section"> 
        <h2>Notre équipe</h2> 
        <div className="team-grid"> 
          <div className="team-member"> 
            <h3>Dr. Sarah Chen</h3> 
            <p className="role">Directrice & Experte en Deep Learning</p> 
            <p>PhD en Intelligence Artificielle de Stanford, 10 ans d'expérience dans la recherche en 
IA.</p> 
          </div> 
          <div className="team-member"> 
            <h3>Marc Dubois</h3> 
            <p className="role">Responsable Pédagogique</p> 
            <p>15 ans d'expérience dans l'enseignement des sciences informatiques et de la data 
science.</p> 
          </div> 
          <div className="team-member"> 
            <h3>Aisha Patel</h3> 
            <p className="role">Experte en IA Appliquée</p> 
            <p>Anciennement chez Google AI, spécialiste des applications pratiques de l'IA en 
entreprise.</p> 
          </div> 
        </div> 
      </section> 
       
      <section className="about-section"> 
        <h2>Notre approche pédagogique</h2> 
        <p> 
          Nous croyons en l'apprentissage par la pratique. Nos cours combinent une base théorique 
solide  
          avec des projets pratiques inspirés de cas réels. Chaque apprenant bénéficie d'un parcours  
          personnalisé et d'un accès à notre communauté active d'étudiants et de professionnels. 
        </p> 
      </section> 
    </main> 
  ); 
}; 
 
export default AboutPage; 