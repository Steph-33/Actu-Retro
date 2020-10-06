import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

export default function HomeArticles() {
  const [allArticles, setAllArticles] = useState([]);

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
    <div className="container">
      <div className="home-container-top">
        TOUTE L’ACTUALITÉ / LES DERNIÈRES NEWS
      </div>
      <div className="home-container">
        {allArticles.map((article, index) => (
          <ArticleCard article={article} key={index} />
        ))}
      </div>
    </div>
  );
}
