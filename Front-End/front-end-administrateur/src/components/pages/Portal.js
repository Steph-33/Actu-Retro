import React from 'react';
import { Link } from 'react-router-dom';

export default function Portal() {
  return (
    <div className="container-portal">
      <div className="box-buttons">
        <Link to="/article">
          <button className="btn-style">Créer un article</button>
        </Link>
        <Link to="/newproduct">
          <button className="btn-style">
            Mettre en ligne un nouveau produit
          </button>
        </Link>
      </div>
    </div>
  );
}
