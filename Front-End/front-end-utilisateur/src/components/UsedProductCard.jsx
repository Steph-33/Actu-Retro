import React from 'react';
import { Link } from 'react-router-dom';

export default function UsedProductCard({ usedProduct }) {
  return (
    <div className="box-usedProduct">
      <Link
        to={`/usedproducts/${usedProduct.id}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          className="usedproduct-image"
          src={usedProduct.image}
          alt="usedProduct"
        />
        <div className="usedproduct-name">{usedProduct.name}</div>
      </Link>
      <div className="usedproduct-price">{usedProduct.price}€</div>
    </div>
  );
}
