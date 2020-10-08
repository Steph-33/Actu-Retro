import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthContext from '../AuthContext';
import Header from '../Header';
import Slider from '../Slider';
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
      <Slider />
      <HomeArticle />
      <HomeNewProduct />
      <HomeUsedProduct />
      <Footer />
    </>
  );
}
