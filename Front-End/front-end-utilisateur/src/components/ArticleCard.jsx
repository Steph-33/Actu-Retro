import React from 'react';

export default function ArticleCard({ article }) {
  return (
    <div className="box-article">
      <a href={`/articles/${article.id}`}>
        <img src={article.image} alt="article" />
        <div className="article-title">{article.title}</div>
      </a>
    </div>
  );
}
