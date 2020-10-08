import React from 'react';
import { Link } from 'react-router-dom';

export default function Portal() {
  const firstname = localStorage.firstname;
  return (
    <div className="container-portal">
      <h1>Bienvenue {firstname}</h1>
      <h3>Que souhaites-tu faire ? </h3>
      <div className="box-buttons">
        <div className="article-buttons">
          <Link to="/article">
            <button className="btn-style">Créer un article</button>
          </Link>
          <Link to="/articles">
            <button className="btn-style">Voir la liste des articles</button>
          </Link>
        </div>
        <div className="newproduct-buttons">
          <Link to="/newproduct">
            <button className="btn-style">
              Mettre en ligne un nouveau produit
            </button>
          </Link>
          <Link to="/newproducts">
            <button className="btn-style">
              Voir la liste des produits neufs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
