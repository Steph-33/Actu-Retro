import React from 'react'
import Header from '../Header';
import NewProductBreadcrumb from '../NewProductBreadcrumb';
import ProductDetails from '../ProductDetails';
import Footer from '../Footer';

export default function NewProductDetails() {
    return (
        <>
          <Header />
          <NewProductBreadcrumb />
          <ProductDetails />
          <Footer />
        </>
      );
}
