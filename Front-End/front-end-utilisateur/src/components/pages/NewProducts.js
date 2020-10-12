import React, { useEffect } from 'react';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import NewProductsList from '../NewProductsList';
import Footer from '../Footer';

export default function NewProduct() {
  useEffect(() => {
    document.title = 'ActuRetro | Produits Neufs';
  });
  return (
    <>
      <Header />
      <Breadcrumb />
      <NewProductsList />
      <Footer />
    </>
  );
}
