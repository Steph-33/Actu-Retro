import React from 'react';
import { Link } from 'react-router-dom';

export default function UsedProductLargeCard({ usedProduct }) {
  return (
    <div className="largebox-usedproduct">
      <Link
        to={`/usedproducts/${usedProduct.id}`}
        style={{ textDecoration: 'none' }}
        className="largebox-usedproduct-content"
      >
        <img
          className="usedproduct-image"
          src={usedProduct.image}
          alt="usedProduct"
        />
        <div className="usedproduct-leftbox">
          <div className="usedproduct--name">{usedProduct.name}</div>
          <div className="usedproduct--state">{usedProduct.state}</div>
          <div className="usedproduct--price">{usedProduct.price}€</div>
        </div>
        <div className="usedproduct-rightbox">
          <div className="usedproduct--location">Localisation : {usedProduct.location}</div>
          <div className="usedproduct--contact">Contact : {usedProduct.contact}</div>
        </div>
      </Link>
    </div>
  );
}