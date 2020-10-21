import React from 'react';
import { Link } from 'react-router-dom';

export default function UsedProductLargeCard({ usedProduct }) {
  return (
    <div className="largebox-usedproduct">
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
        <div className="usedproduct-state">{usedProduct.state}</div>
        <div className="usedproduct-price">{usedProduct.price}€</div>
        <div className="usedproduct-location">{usedProduct.location}</div>
      </Link>
    </div>
  );
}