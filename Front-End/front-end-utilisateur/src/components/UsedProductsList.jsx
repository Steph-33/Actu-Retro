import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsedProductLargeCard from './UsedProductLargeCard';

export default function UsedProductsList() {
  const [allUsedProducts, setAllUsedProducts] = useState([]);

  useEffect(() => {
    const getUsedProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/usedproducts/'
        );
        setAllUsedProducts(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getUsedProducts();
  }, []);
  return (
    <>
      <div className="search-input"></div>
      <div className="usedproducts-body">
        <div className="usedproducts-body-left"></div>
        <div className="usedproducts-body-right">
          {allUsedProducts.map((usedProduct, index) => (
            <div className="usedproducts-body-right-card" key={index}>
            <UsedProductLargeCard usedProduct={usedProduct} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
