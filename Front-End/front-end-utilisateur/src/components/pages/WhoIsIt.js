import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import WhoIsItDetails from '../WhoIsItDetails';
import Footer from '../Footer';

export default function WhoIsIt() {
  useEffect(() => {
    document.title = 'ActuRetro | C\'est qui ? ';
  });
  return (
    <>
      <Header />
      <div className="breadcrumb-container">
          <Link to={"/"} style={{color: 'white', textDecoration:'none'}}>ACCUEIL/</Link>
          <p>ActuRetro c'est qui ? </p>
        </div>
      <WhoIsItDetails />
      <Footer />
    </>
  );
}