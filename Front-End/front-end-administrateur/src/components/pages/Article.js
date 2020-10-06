import { Fragment, useState } from 'react';
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
    console.log('event.target =========>', event.target);
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleFile = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
    console.log(event.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/articles', article, config)
      .then((response) => {
        console.log('article-response ===========>', response);
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
      <form className="form-article" encType="multipart/form-data">
        <input
          className="input-article"
          type="text"
          name="title"
          placeholder="Entre le titre de ton article"
          value={article.title}
          onChange={handleChange}
          required
        />
        <textarea
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
        <div>
          <label htmlFor="image">Sélectionne une image </label>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpg, .jpeg, .png"
            value={article.image}
            onChange={handleFile}
            required
          />
        </div>
        {/* <input
          className="input-article"
          type="text"
          name="image"
          placeholder="Lien vers l'image"
          value={article.image}
          onChange={handleChange}
          required
        /> */}
        <button className="form-article-button" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
