import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import WhatIsItDetails from '../WhatIsItDetails';
import Footer from '../Footer';

export default function WhatIsIt() {
  useEffect(() => {
    document.title = 'ActuRetro | C\'est quoi ? ';
  });
  return (
    <>
      <Header />
      <div className="breadcrumb-container">
          <Link to={"/"} style={{color: 'white', textDecoration:'none'}}>ACCUEIL/</Link>
          <p>ActuRetro c'est quoi ? </p>
        </div>
      <WhatIsItDetails />
      <Footer />
    </>
  );
}