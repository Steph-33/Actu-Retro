import React, { useEffect } from 'react';
import Header from '../Header';
import Slides from '../Slides';
import HomeArticle from '../HomeArticles';
import HomeNewProduct from '../HomeNewProducts';
import HomeUsedProduct from '../HomeUsedProducts';
import Footer from '../Footer';
import Slider from "../slider/Slider"
import Images from "../slider/images"

export default function Home() {
  useEffect(() => {
    document.title = 'ActuRetro | Accueil';
  });
  return (
    <>
      <Header />
      {/* <Slider images={Images} /> */}
      <Slides />
      <HomeArticle />
      <HomeNewProduct />
      <HomeUsedProduct />
      <Footer />
    </>
  );
}
