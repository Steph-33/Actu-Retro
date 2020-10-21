import React, { useEffect } from 'react';
import Header from '../Header';
import UsedProductBreadcrumb from '../UsedProductBreadcrumb';
import UsedProductsList from '../UsedProductsList';
import Footer from '../Footer';

export default function UsedProduct() {
  useEffect(() => {
    document.title = 'ActuRetro | Produits d\'Occasion';
  });
  return (
    <>
      <Header />
      <UsedProductBreadcrumb />
      <UsedProductsList />
      <Footer />
    </>
  );
}