import React from 'react'
import Header from '../Header';
import ArticleBreadcrumb from '../ArticleBreadcrumb';
import ArticleDetails from '../ArticleDetails';
import Footer from '../Footer';

export default function Article() {
    return (
        <>
          <Header />
          <ArticleBreadcrumb />
          <ArticleDetails />
          <Footer />
        </>
      );
}