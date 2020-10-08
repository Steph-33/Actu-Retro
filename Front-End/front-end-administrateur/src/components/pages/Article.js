import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormData from 'form-data';

export default function Article() {
  const history = useHistory();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    'http://localhost:8080/images/image-neutre.png'
  );
  const token = localStorage.getItem('token');
  const firstname = localStorage.firstname;
  const handleChange = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
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
    data.append('title', article.title);
    data.append('content', article.content);
    data.append('author', article.author);

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/articles',
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
      className="container-article"
      method="POST"
      action="/article"
      onSubmit={handleSubmit}
    >
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
        <div className="image-selection">
          <div>
            <label htmlFor="image">Sélectionne une image </label>
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
        <button className="form-article-button" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}
