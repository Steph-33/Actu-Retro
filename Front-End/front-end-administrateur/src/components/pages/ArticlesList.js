import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ArticlesList() {
  const history = useHistory();
  console.log('history ========> ', history);
  const token = localStorage.getItem('token');
  const [allArticles, setAllArticles] = useState([]);

  const handleDelete = (event) => {
    event.preventDefault();

    const id = event.target.id;
    var config = {
      method: 'delete',
      url: `http://localhost:8080/api/articles/${id}`,
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        history.push('/articles');
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/articles');
        setAllArticles(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getArticles();
  }, []);
  return (
    <div className="articles-container">
      <h1 className="introduction-sentence">
        Voici la liste des différents articles !
      </h1>
      {allArticles.map((article, index) => (
        <div className="article-container" method="POST" key={index}>
          <div className="article-title">{article.title}</div>
          <div className="article-container-buttons">
            <button className="article-modify-button" type="submit">
              Modifier
            </button>
            <button
              id={article.id}
              onClick={handleDelete}
              className="article-delete-button"
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
