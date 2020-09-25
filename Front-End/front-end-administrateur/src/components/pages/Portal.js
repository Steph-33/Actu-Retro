import React from 'react';

export default function Portal() {
  return (
    <div className="container-portal">
      <div className="box-buttons">
        <a href="/article">
          <button className="btn-style">Créer un article</button>
        </a>
        <a href="/newproduct">
          <button className="btn-style">
            Mettre en ligne un nouveau produit
          </button>
        </a>
      </div>
    </div>
  );
}
