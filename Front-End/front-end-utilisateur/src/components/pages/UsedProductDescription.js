import React from 'react'
import Header from '../Header';
import UsedProductBreadcrumb from '../UsedProductBreadcrumb';
import UsedProductDetails from '../UsedProductDetails';
import Footer from '../Footer';

export default function UsedProductDescription() {
    return (
        <>
          <Header />
          <UsedProductBreadcrumb />
          <UsedProductDetails />
          <Footer />
        </>
      );
}