import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, NavLink } from 'react-router-dom';
import FormData from 'form-data';

export default function CreateAnnouncement() {
  useEffect(() => {
    document.title = 'ActuRetro | Créer une Annonce';
  });
  const token = localStorage.getItem('token');
  const date = new Date();
  const date_of_announcement = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const history = useHistory();
  const [create, setCreate] = useState({
    date_of_announcement: '',
    name: '',
    state: '',
    description: '',
    price: '',
    location: '',
    contact: '',
    image: '',
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    'http://localhost:8080/images/image-neutre.png'
  );

  const handleChange = (event) => {
    setCreate({ ...create, [event.target.name]: event.target.value });
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

    data.append('date_of_announcement', date_of_announcement);
    data.append('name', create.name);
    data.append('state', create.state);
    data.append('description', create.description);
    data.append('price', create.price);
    data.append('location', create.location);
    data.append('contact', create.contact);
    data.append('image', image.image);

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/usedproducts',
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        history.push('/');
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <NavLink to="/">
        <img
          className="register-logo"
          src="/assets/images/logo_acturetro_accueil.png"
          alt="logo"
        />
      </NavLink>
      <div
        className="announcement-container"
        onSubmit={handleSubmit}
      >
        <form className="announcement-form">
          <h1 className="bienvenue">Bienvenue</h1>
          <h3>Merci de remplir les champs suivant pour créer une annonce</h3>
          <input
            className="announcement-input"
            type="text"
            name="name"
            placeholder="Nom du Produit"
            value={create.name}
            onChange={handleChange}
            required
          />
          <input
            className="announcement-input"
            type="text"
            name="state"
            placeholder="État du produit"
            value={create.state}
            onChange={handleChange}
            required
          />
          <textarea
          className="announcement-description-input"
          type="text"
          name="description"
          placeholder="Entrez une description de votre produit"
          value={create.description}
          onChange={handleChange}
          required
        />
          <input
            className="announcement-input"
            type="text"
            name="price"
            placeholder="Prix souhaité pour votre produit"
            value={create.price}
            onChange={handleChange}
          />
          <input
            className="announcement-input"
            type="text"
            name="location"
            placeholder="Lieu de résidence"
            value={create.location}
            onChange={handleChange}
          />
          <input
            className="announcement-input"
            type="text"
            name="contact"
            placeholder="Merci d'entrer un numéro de téléphone"
            value={create.contact}
            onChange={handleChange}
            required
          />
          <div className="image-selection">
            <div>
              <label htmlFor="image">Sélectionnez une photo pour votre produit </label>
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
              alt="Prévisualisation"
            />
          </div>
          <button className="announcement-form-button" type="submit">
            Valider
          </button>
        </form>
      </div>
    </>
  );
}
