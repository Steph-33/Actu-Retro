import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <div className="box-article">
      <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
        <img className="article-image" src={article.image} alt="article" />
        <div className="article-title">{article.title}</div>
      </Link>
    </div>
  );
}
