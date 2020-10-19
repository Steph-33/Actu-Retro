import React, { useEffect } from 'react';
import Header from '../Header';
import Slides from '../Slides';
import HomeArticle from '../HomeArticles';
import HomeNewProduct from '../HomeNewProducts';
import HomeUsedProduct from '../HomeUsedProducts';
import Footer from '../Footer';

export default function Home() {
  useEffect(() => {
    document.title = 'ActuRetro | Accueil';
  });
  return (
    <>
      <Header />
      <Slides />
      <HomeArticle />
      <HomeNewProduct />
      <HomeUsedProduct />
      <Footer />
    </>
  );
}
