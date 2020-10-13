import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ArticleBreadcrumb() {
  const [article, setArticle] = useState({});
  let {id} = useParams(); 

  useEffect(() => {
    const getArticle = async() =>{
        try {
          const response = await axios.get(
            `http://localhost:8080/api/articles/${id}`
          );
          setArticle(response.data);
        } catch (error) {
          console.error(error);
        }
    };
    getArticle();
  }, [id]);

  return <div className="breadcrumb-container">
          <Link to={"/"} style={{color: 'white', textDecoration:'none'}}>ACCUEIL/</Link>
          <Link to={"/"} style={{color: 'white', textDecoration:'none'}}>Articles/</Link>
          <p>{article.title}</p>
        </div>;
}
