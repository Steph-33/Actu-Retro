import { useState, useContext, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthContext from '../AuthContext';
import Header from '../Header';
import Slider from '../Slider';
import Footer from '../Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Slider />
      <div>Welcome Home</div>
      <Footer />
    </>
  );
}
