import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    picture: '',
  });
  const [error, setError] = useState(null);
  const [toDashboard, setToDashboard] = useState(false);
  const token = localStorage.token;
  const firstname = localStorage.firstname;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/newproducts', newProduct, config)
      .then((response) => {
        console.log('response:', response);
        setNewProduct({
          name: '',
          description: '',
          price: '',
          quantity: '',
          picture: '',
        });
        setToDashboard(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
    console.log(error);
  };

  return (
    <div
      className="container-newproduct"
      method="POST"
      action="/newproduct"
      onSubmit={handleSubmit}
    >
      {toDashboard ? <Redirect to="/portal" /> : null}
      <h1>Bienvenue {firstname}</h1>
      <form className="form-newproduct">
        <input
          className="input-newproduct"
          type="text"
          name="name"
          placeholder="Entre le nom du produit"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          className="input-newproduct-description"
          type="textarea"
          name="description"
          placeholder="Description du produit"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          className="input-newproduct"
          type="text"
          name="price"
          placeholder="Prix"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          className="input-newproduct"
          type="text"
          name="quantity"
          placeholder="Quantité"
          value={newProduct.quantity}
          onChange={handleChange}
          required
        />
        <input
          className="input-newproduct"
          type="text"
          name="picture"
          placeholder="Photo du produit"
          value={newProduct.picture}
          onChange={handleChange}
          required
        />
        <button className="form-newproduct-button" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
