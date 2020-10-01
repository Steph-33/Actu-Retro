import { useState, useContext, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthContext from '../AuthContext';
import Header from '../Header';
import Slider from '../Slider';
import HomeArticle from '../HomeArticles';
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
      <Footer />
    </>
  );
}
