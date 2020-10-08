import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserCard from './UserCard';

export default function Header() {
  const [firstname, setFirstname] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getUserSession = () => {
    const firstname = localStorage.getItem('firstname');
    setFirstname(firstname);
  };

  useEffect(() => {
    getUserSession();
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
          {firstname ? (
            <div className="session-box">
              <p className="welcome-message">Bienvenue {firstname} ! </p>
              <Link className="quit-link" onClick={logout}>
                Se déconnecter
              </Link>
            </div>
          ) : null}
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
