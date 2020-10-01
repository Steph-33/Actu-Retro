import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Register() {
  const [signup, setSignup] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [error, setError] = useState(null);
  const [toDashboard, setToDashboard] = useState(false);

  const handleChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/user/register', signup)
      .then((response) => {
        console.log('#response', response);
        setSignup({
          lastname: '',
          firstname: '',
          email: '',
          password: '',
          avatar: '',
        });
        console.log('hello');
        localStorage.setItem('firstname', signup.firstname);
        localStorage.setItem('lastname', signup.lastname);
        localStorage.setItem('avatar', signup.avatar);
        setToDashboard(true);
        console.log(localStorage.getItem('firstname'));
      })
      .catch((error) => {
        console.log('#error', error.response);
      });
  };

  return (
    <div
      className="container-login"
      method="POST"
      action="/signup"
      onSubmit={handleSubmit}
    >
      <form className="form-login">
        {toDashboard ? <Redirect to="/" /> : null}
        <h1>Bienvenue</h1>
        <h3>Merci de remplir les champs suivant pour créer votre compte</h3>
        <input
          className="input-login"
          type="text"
          name="lastname"
          placeholder="Nom"
          value={signup.lastname}
          onChange={handleChange}
          required
        />
        <input
          className="input-login"
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={signup.firstname}
          onChange={handleChange}
          required
        />
        <input
          className="input-login"
          type="email"
          name="email"
          placeholder="Votre adresse e-mail"
          value={signup.email}
          onChange={handleChange}
        />
        <input
          className="input-login"
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          value={signup.password}
          onChange={handleChange}
          required
        />
        <input
          className="input-login"
          type="text"
          name="avatar"
          placeholder="https://votre_avatar_jpeg.com"
          value={signup.avatar}
          onChange={handleChange}
          required
        />
        <button className="form-login-button" type="submit">
          Connexion
        </button>
      </form>
    </div>
  );
}
