import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsedProductCard from './UsedProductCard';
import { Link } from 'react-router-dom';

export default function HomeUsedProducts() {
  const [allUsedProducts, setAllUsedProducts] = useState([]);

  useEffect(() => {
    const getUsedProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/allusedproducts/8'
        );
        setAllUsedProducts(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getUsedProducts();
  }, []);

  return (
    <div className="container">
      <div className="container-top-label">
        <div className="home-container-top">TOUT LE CHARME DE L'ANCIEN</div>
        <Link
          to={`/usedproducts`}
          style={{ textDecoration: 'none' }}
          className="newproducts-label"
        >
          MARCHÉ DE L'OCCASION
        </Link>
      </div>
      <div className="home-container-used">
        {allUsedProducts.map((usedProduct, index) => (
          <UsedProductCard usedProduct={usedProduct} key={index} />
        ))}
      </div>
    </div>
  );
}
