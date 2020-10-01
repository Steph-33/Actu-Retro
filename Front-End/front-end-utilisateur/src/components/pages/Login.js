import { useState, useContext, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';
import AuthContext from '../AuthContext';

export default function Login() {
  useEffect(() => {
    document.title = 'ActuRetro | Connexion';
  });
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [toDashboard, setToDashboard] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, [context]);

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/user/login', login)
      .then((response) => {
        console.log(response);
        setLogin({ email: '', password: '' });
        context.setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('firstname', response.data.user.firstname);
        localStorage.setItem('lastname', response.data.user.lastname);
        setToDashboard(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
    console.log(error);
  };

  return (
    <>
      <NavLink to="/">
        <img
          className="login-logo"
          src="/assets/images/logo_acturetro_accueil.png"
          alt="logo"
        />
      </NavLink>
      <div
        className="container-login"
        method="POST"
        action="/login"
        onSubmit={handleSubmit}
      >
        {toDashboard ? <Redirect to="/" /> : null}
        <h1>Bienvenue. Merci de vous identifier</h1>
        <form className="form-login">
          <input
            className="input-login"
            type="email"
            name="email"
            placeholder="Entrez votre email..."
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
    </>
  );
}
