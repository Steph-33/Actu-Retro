import React, { useEffect } from 'react';
import Header from '../Header';
import NewProductBreadcrumb from '../NewProductBreadcrumb';
import NewProductsList from '../NewProductsList';
import Footer from '../Footer';

export default function NewProduct() {
  useEffect(() => {
    document.title = 'ActuRetro | Produits Neufs';
  });
  return (
    <>
      <Header />
      <NewProductBreadcrumb />
      <NewProductsList />
      <Footer />
    </>
  );
}
