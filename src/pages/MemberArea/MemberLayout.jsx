import React from 'react'; 
import { Outlet, NavLink } from 'react-router-dom'; 
import './MemberArea.css'; 
 
const MemberLayout = () => { 
  return ( 
    <main className="main-content"> 
      <div className="member-area"> 
        <div className="member-sidebar"> 
          <h2>Espace Membre</h2> 
          <nav className="member-nav"> 
            <NavLink to="/member" end className={({ isActive }) => isActive ? 'active' : ''}> 
              Tableau de bord 
            </NavLink> 
            <NavLink to="/member/profile" className={({ isActive }) => isActive ? 'active' : ''}> 
              Mon Profil 
            </NavLink> 
            <NavLink to="/member/courses" className={({ isActive }) => isActive ? 'active' : ''}> 
              Mes Cours 
            </NavLink> 
            <NavLink to="/member/settings" className={({ isActive }) => isActive ? 'active' : ''}> 
              Paramètres 
            </NavLink> 
          </nav> 
        </div> 
         
        <div className="member-content"> 
          {/* Le composant Outlet rendra le composant enfant correspondant à la route */} 
          <Outlet /> 
        </div> 
      </div> 
    </main> 
  ); 
}; 
 
export default MemberLayout;