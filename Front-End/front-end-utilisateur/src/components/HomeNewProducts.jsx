import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewProductCard from './NewProductCard';
import { Link } from 'react-router-dom';

export default function HomeNewProducts() {
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
  }, [allNewProducts]);

  return (
    <div className="container">
      <div className="container-top-label">
        <div className="home-container-top">TOUTES LES NOUVEAUTÉS</div>
        <Link
          to={`/newproducts`}
          style={{ textDecoration: 'none' }}
          className="newproducts-label"
        >
          PRODUITS NEUFS
        </Link>
      </div>
      <div className="home-container">
        {allNewProducts.map((newProduct, index) => (
          <NewProductCard newProduct={newProduct} key={index} />
        ))}
      </div>
    </div>
  );
}
