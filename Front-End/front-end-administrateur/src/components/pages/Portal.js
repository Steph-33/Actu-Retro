import React from 'react';

class Portal extends React.Component {
  render() {
    return (
      <div className="container-portal">
        <img src="/assets/images/logo_acturetro_rectangle.png" alt="logo" />
        <div className="box-buttons">
          <a href="/article">
            <button className="btn-style">Créer un article</button>
          </a>
          <a href="/newproduct">
            <button className="btn-noStyle">
              Mettre en ligne un nouveau produit
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default Portal;
