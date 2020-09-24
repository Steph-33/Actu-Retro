import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Article() {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
  });
  const [error, setError] = useState(null);
  const [toDashboard, setToDashboard] = useState(false);
  const token = localStorage.token;
  const firstname = localStorage.firstname;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleChange = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/articles', article, config)
      .then((response) => {
        console.log('response:', response);
        setArticle({ title: '', content: '', author: '', image: '' });
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
      className="container-article"
      method="POST"
      action="/article"
      onSubmit={handleSubmit}
    >
      {toDashboard ? <Redirect to="/portal" /> : null}
      <h1>Bienvenue {firstname}</h1>
      <form className="form-article">
        <input
          className="input-article"
          type="text"
          name="title"
          placeholder="Entre le titre de ton article"
          value={article.title}
          onChange={handleChange}
          required
        />
        <input
          className="input-article-content"
          type="text"
          name="content"
          placeholder="Entre le contenu de ton article"
          value={article.content}
          onChange={handleChange}
          required
        />
        <input
          className="input-article"
          type="text"
          name="author"
          placeholder="Auteur de l'article"
          value={article.author}
          onChange={handleChange}
          required
        />
        <input
          className="input-article"
          type="text"
          name="image"
          placeholder="Lien vers l'image"
          value={article.image}
          onChange={handleChange}
          required
        />
        <button className="form-article-button" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
