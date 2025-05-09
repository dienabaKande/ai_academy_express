import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <h1>AI Academy</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              À propos
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>
              Cours
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              Contact
            </NavLink>
          </li>
          {/* Ajout de l'élément pour l'espace membre */}
          <li>
            <NavLink to="/member" className={({ isActive }) => isActive ? 'active' : ''}>
              Espace Membre
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
