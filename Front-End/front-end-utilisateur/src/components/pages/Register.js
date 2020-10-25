import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, NavLink } from 'react-router-dom';
import FormData from 'form-data';

export default function Register() {
  useEffect(() => {
    document.title = 'ActuRetro | Enregistrement';
  });
  const history = useHistory();
  const [signup, setSignup] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    image: '',
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    'http://localhost:8080/images/image-neutre.png'
  );

  const handleChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
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

    data.append('firstname', signup.firstname);
    data.append('lastname', signup.lastname);
    data.append('email', signup.email);
    data.append('password', signup.password);
    data.append('image', image.image);

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/user/register',
      headers: {
        'Content-type': 'multipart/form-data',
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
        className="container-register"
        method="POST"
        action="/signup"
        onSubmit={handleSubmit}
      >
        <form className="form-register">
          <h1 className="bienvenue">Bienvenue</h1>
          <h3>Merci de remplir les champs suivant pour créer votre compte</h3>
          <input
            className="input-register"
            type="text"
            name="lastname"
            placeholder="Nom"
            value={signup.lastname}
            onChange={handleChange}
            required
          />
          <input
            className="input-register"
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={signup.firstname}
            onChange={handleChange}
            required
          />
          <input
            className="input-register"
            type="email"
            name="email"
            placeholder="Votre adresse e-mail"
            value={signup.email}
            onChange={handleChange}
          />
          <input
            className="input-register"
            type="password"
            name="password"
            placeholder="Votre mot de passe"
            value={signup.password}
            onChange={handleChange}
            required
          />
          <div className="image-selection">
            <div>
              <label htmlFor="image">Sélectionnez une photo de profil </label>
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
          <button className="form-register-button" type="submit">
            S'enregistrer
          </button>
        </form>
      </div>
    </>
  );
}
