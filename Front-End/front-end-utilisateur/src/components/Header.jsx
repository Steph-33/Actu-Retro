import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserCard from './UserCard';
import AuthContext from './AuthContext';
import Sidebar from './Sidebar';

export default function Header() {
  const {state} = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  
  const logout = () =>{
    dispatch({
      type:"LOGOUT",
    });
  }
  return (
    <>
      <div className="header-top">
        L’ACTUALITÉ, LES PRODUITS NEUFS OU D’OCCASION, FAITES VOTRE CHOIX !
      </div>
      <div className="intro">
        <NavLink className="intro-navlink" to="/" style={{ textDecoration: 'none' }}>
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
        <div className="burger-menu">
          <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
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
