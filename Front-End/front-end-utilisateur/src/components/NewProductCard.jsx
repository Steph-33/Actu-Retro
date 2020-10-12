import React from 'react';
import { Link } from 'react-router-dom';

export default function NewProductCard({ newProduct }) {
  const handleSubmit = (e) => {
    e.preventDefault();
        localStorage.setItem('id', newProduct.id);
        localStorage.setItem('image', newProduct.image);
        localStorage.setItem('name', newProduct.name);
        localStorage.setItem('price', newProduct.price);
        localStorage.setItem('description', newProduct.description);
  };

  return (
    <div className="box-newproduct" onClick={handleSubmit}>
      <Link
        to={`/newproducts/${newProduct.id}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          className="newproduct-image"
          src={newProduct.image}
          alt="newProduct"
        />
        <div className="newproduct-name">{newProduct.name}</div>
      </Link>
      <div className="newproduct-price">{newProduct.price}€</div>
    </div>
  );
}
