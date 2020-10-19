import React from 'react';
import { Link } from 'react-router-dom';
import newProduct from '../images/games-4261598_1280.jpg';
import oldies from '../images/nintendo-4684999_1920.jpg'

export default function Slides() {
  
  return (

    <div className='slides-container'>
    {/* <div className="slider">
      <h1 className="slider-title">
        TOUT LE RETROGAMING SUR LES MACHINES LES PLUS RECENTES
      </h1>
      <h3 className="slider-text">
        Trouvez parmi nos offres les machines les plus récentes émulant les
        systèmes les plus anciens, pour des heures de jeux et de parties
        passionnées
      </h3>
    </div> */}
      <div style={{
        backgroundImage: `url(${newProduct})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        width:'100vw'
      }}>
        <div className="slider-1">
          <h1 className="slider-title">
            TOUT LE RETROGAMING SUR LES MACHINES LES PLUS RECENTES
          </h1>
          <h3 className="slider-text">
            Trouvez parmi nos offres les machines les plus récentes émulant les
            systèmes les plus anciens, pour des heures de jeux et de parties
            passionnées
          </h3>
          <Link to="/newproducts"><button className="enterButton" type="button">Entrez</button></Link>
        </div>
      </div>
      {/* <div style={{
        backgroundImage: `url(${oldies})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        width:'100vw'
      }}>
        <div className="slider-2">
          <h1 className="slider-title">
            TOUT LE RETROGAMING SUR LES MACHINES LES PLUS RECENTES
          </h1>
          <h3 className="slider-text">
            Trouvez parmi nos offres les machines les plus récentes émulant les
            systèmes les plus anciens, pour des heures de jeux et de parties
            passionnées
          </h3>
        </div>
      </div> */}
  </div>
  );
}
