import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [toDashboard, setToDashboard] = useState(false);

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/admin/login', login)
      .then((response) => {
        console.log(response);
        setLogin({ email: '', password: '' });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem(
          'firstname',
          response.data.administrator.firstname
        );
        localStorage.setItem('lastname', response.data.administrator.lastname);
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
      className="container-login"
      method="POST"
      action="/login"
      onSubmit={handleSubmit}
    >
      {toDashboard ? <Redirect to="/portal" /> : null}
      <h1>Bienvenue cher Administrateur !! </h1>
      <h3>Merci de t'identifier</h3>
      <form className="form-login">
        <input
          className="input-login"
          type="email"
          name="email"
          placeholder="Entre ton adresse email..."
          value={login.email}
          onChange={handleChange}
          required
        />
        <input
          className="input-login"
          type="password"
          name="password"
          placeholder="Mot de passe..."
          value={login.password}
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
