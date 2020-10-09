import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewProductCard from './NewProductCard';

export default function NewProductsList() {
  const [allNewProducts, setAllNewProducts] = useState([]);

  useEffect(() => {
    const getNewProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/newproducts'
        );
        setAllNewProducts(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getNewProducts();
  }, []);
  return (
    <>
      <div className="search-input"></div>
      <div className="newproducts-body">
        <div className="newproducts-body-left"></div>
        <div className="newproducts-body-right">
          {allNewProducts.map((newProduct, index) => (
            <div className="newproducts-body-right-card">
            <NewProductCard newProduct={newProduct} key={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
