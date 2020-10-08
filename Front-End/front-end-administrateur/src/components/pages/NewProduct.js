import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function NewProduct() {
  const history = useHistory();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    'http://localhost:8080/images/image-neutre.png'
  );
  const token = localStorage.getItem('token');
  const firstname = localStorage.firstname;
  const handleChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleFile = (event) => {
    const [filename] = event.target.files;
    try {
      setImage({ image: filename });
      setPreviewImage(URL.createObjectURL(filename));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var data = new FormData();

    data.append('image', image.image);
    data.append('name', newProduct.name);
    data.append('description', newProduct.description);
    data.append('price', newProduct.price);
    data.append('quantity', newProduct.quantity);

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/newproducts',
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        history.push('/portal');
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="container-newproduct"
      method="POST"
      action="/newproduct"
      onSubmit={handleSubmit}
    >
      <h1>Bienvenue {firstname}</h1>
      <form className="form-newproduct" encType="multipart/form-data">
        <input
          className="input-newproduct"
          type="text"
          name="name"
          placeholder="Entre le nom du produit"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <textarea
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
        <div className="image-selection">
          <div>
            <label htmlFor="image">Sélectionne une photo </label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={handleFile}
              required
            />
          </div>
          <img
            className="preview-image"
            src={previewImage}
            alt="Image de Prévisualisation"
          />
        </div>
        <button className="form-newproduct-button" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
