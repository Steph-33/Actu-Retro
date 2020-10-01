import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className="header-top">
        L’ACTUALITÉ, LES PRODUITS NEUFS OU D’OCCASION, FAITES VOTRE CHOIX !
      </div>
      <NavLink to="/">
        <img
          className="logo"
          src="/assets/images/logo_acturetro_accueil.png"
          alt="logo"
        />
      </NavLink>
      <div className="catch-line">Toute l'actualité du Retrogaming</div>
      <nav>
        <Link className="header-link" to="/">
          ACCUEIL
        </Link>
        <Link className="header-link">ACTURETRO C'EST QUOI ? </Link>
        <Link className="header-link">ACTURETRO C'EST QUI ? </Link>
        <Link className="header-link" to="/register">
          UTILISATEUR
        </Link>
        <Link className="header-link">CONTACT</Link>
      </nav>
    </>
  );
}
