import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserCard from './UserCard';
import AuthContext from './AuthContext'

export default function Header() {
  const [refresh, setRefresh] = useState(false);
  const {state} = useContext(AuthContext);
  
  useEffect(() => {
    setRefresh(true);
    if (refresh) {
      window.location = '/';
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setRefresh(true);
    if (refresh) {
      window.location = '/';
    }
  };
  return (
    <>
      <div className="header-top">
        L’ACTUALITÉ, LES PRODUITS NEUFS OU D’OCCASION, FAITES VOTRE CHOIX !
      </div>
      <div className="intro">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <img
            className="header-logo"
            src="/assets/images/logo_acturetro_accueil.png"
            alt="logo"
          />
          <div className="catch-line">Toute l'actualité du Retrogaming</div>
        </NavLink>
        <div className="registration-box">
          {state.user && (
            <div className="session-box">
              <p className="welcome-message">Bienvenue {state.user.firstname} ! </p>
              <Link className="quit-link" onClick={logout}>
                Se déconnecter
              </Link>
            </div>
          )}
        </div>
      </div>
      <nav>
        <Link className="header-link" to="/">
          ACCUEIL
        </Link>
        <Link className="header-link">ACTURETRO C'EST QUOI ? </Link>
        <Link className="header-link">ACTURETRO C'EST QUI ? </Link>
        <UserCard />
        <Link className="header-link">CONTACT</Link>
      </nav>
    </>
  );
}
