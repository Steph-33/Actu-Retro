import React from 'react';
import { Link } from 'react-router-dom';

export default function NewProductCard({ newProduct }) {
  return (
    <div className="box-newProduct">
      <Link
        to={`/newproducts/${newProduct.id}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          className="newproduct-image"
          src={newProduct.picture}
          alt="newProduct"
        />
        <div className="newproduct-name">{newProduct.name}</div>
      </Link>
      <div className="newproduct-price">{newProduct.price}€</div>
    </div>
  );
}
