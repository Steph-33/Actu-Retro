import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ArticleDetails() {
    const [article, setArticle] = useState({});
    const [otherArticles, setOtherArticles] = useState([]);
    const [products, setProducts] = useState([]);
    let {id} = useParams(); 

    useEffect(() => {
      const getArticle = async() =>{
          try {
            console.log('id =======>', id);
            const response = await axios.get(
              `http://localhost:8080/api/articles/${id}`
            );
            setArticle(response.data);
          } catch (error) {
            console.error(error);
          }
      };
      getArticle();
      const getOtherArticles = async () => {
        try {
          const response = await axios.get(
            'http://localhost:8080/api/articles'
          );
          setOtherArticles(response.data.reverse());
        } catch (error) {
            console.error(error.response);
        }
        };
        getOtherArticles();
      const getProducts = async () => {
          try {
            const response = await axios.get(
              'http://localhost:8080/api/allnewproducts/3'
            );
            setProducts(response.data.reverse());
          } catch (error) {
              console.error(error.response);
          }
      };
      getProducts();
    }, [id]);
    return (
        <div className="article-container">
            <div className="article-container-left">
            <p className="otherarticles-title">Tous les articles...</p>
            {otherArticles.map((otherArticle, index) => (
                <div className="articles-list-container-left" key={index}> 
                    <Link to={`/articles/${otherArticle.id}`} style={{ textDecoration: 'none', color:'white' }}>
                        <p className="otherArticle-title">{otherArticle.title}</p>
                    </Link>
                </div>
            ))}
            </div>
            <div className="article-container-center">
                <p className="this-article-title">{article.title}</p>
                <p className="this-article-content">{article.content}</p>
            </div>
            <div className="article-container-right">
                <div className="article-container-right-top">
                    <img className="this-article-image" src={article.image}/>
                </div>
                <div className="article-container-right-bottom">
                    <p className="article-product-interest">Ces produits pourraient vous intéresser</p>
                    <hr></hr>
                    {products.map((product, index) => (
                    <div className="products-right-card" key={index}>
                        <Link to={`/newproducts/${product.id}`} style={{ textDecoration: 'none' }}>
                            <img className="products-right-card-image" src={product.image} alt="image-produit"/>
                            <div className="products-right-card-name-price">
                                <p className="products-detail-name">{product.name}</p>
                                <p className="products-detail-price">{product.price}€</p>
                            </div>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
