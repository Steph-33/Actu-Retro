import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function NewProductsList() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [allNewProducts, setAllNewProducts] = useState([]);

  const handleDelete = (event) => {
    event.preventDefault();

    const id = event.target.id;
    var config = {
      method: 'delete',
      url: `http://localhost:8080/api/newproducts/${id}`,
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        history.push('/newproducts');
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    <div className="newproducts-container">
      <h1 className="introduction-sentence">
        Hé, hé, voici l'ensemble des produits en lignes !!!
      </h1>
      {allNewProducts.map((newProduct, index) => (
        <div className="newproduct-container" method="POST" key={index}>
          <div className="newproduct-name">{newProduct.name}</div>
          <div className="newproduct-container-buttons">
            <button className="newproduct-modify-button" type="submit">
              Modifier
            </button>
            <button
              id={newProduct.id}
              onClick={handleDelete}
              className="newproduct-delete-button"
              type="submit"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
