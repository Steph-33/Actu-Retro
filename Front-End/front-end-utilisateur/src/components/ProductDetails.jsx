import React, {useState,useEffect} from 'react';
import axios from 'axios';
import NewProductCard from './NewProductCard';
import { Link } from 'react-router-dom';

export default function ProductDetails() {
    const [newProduct, setNewProduct] = useState([]);
    const [otherProducts, setOtherProducts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
            localStorage.clear();
            localStorage.setItem('id', newProduct.id);
            localStorage.setItem('image', newProduct.image);
            localStorage.setItem('name', newProduct.name);
            localStorage.setItem('price', newProduct.price);
            localStorage.setItem('description', newProduct.description);
      };

    useEffect(() => {
        const getNewProduct = async () => {
            let id = localStorage.getItem('id');
          try {
            const response = await axios.get(
              `http://localhost:8080/api/newproducts/${id}`
            );
            setNewProduct(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        getNewProduct();
        const getOtherProducts = async () => {
            try {
              const response = await axios.get(
                'http://localhost:8080/api/allnewproducts/3'
              );
              setOtherProducts(response.data.reverse());
            } catch (error) {
              console.error(error.response);
            }
          };
          getOtherProducts();
      }, []);
    return (
        <div className="details-container">
            <div className="details-container-left">
                <img className="detail-image" src={newProduct.image} alt="Product"/>
                <p className="detail-name">{newProduct.name}</p>
                <p className="detail-price">{newProduct.price}€</p>
                <p className="detail-description">Description</p>
                <p className="detail-content">{newProduct.description}</p>
            </div>
            <div className="details-container-right">
                <div className="details-container-right-top">
                    <p className="product-interest">Ce produit vous intéresse ? </p>
                    <button className="buy-button">Acheter</button>
                    <button className="back-button">Revenir à la liste</button>
                </div>
                <div className="details-container-right-bottom">
                    <p className="product-interest">Annonces qui pourraient vous intéresser</p>
                    <hr></hr>
                    {otherProducts.map((newProduct, index) => (
                    <div onClick={handleSubmit} className="newproducts-right-card" key={index}>
                        <Link to={`/newproducts/${newProduct.id}`} style={{ textDecoration: 'none' }}>
                            <img className="newproducts-right-card-image" src={newProduct.image} alt="image-produit"/>
                            <div className="newproducts-right-card-name-price">
                                <p className="detail-name">{newProduct.name}</p>
                                <p className="detail-price">{newProduct.price}€</p>
                            </div>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
