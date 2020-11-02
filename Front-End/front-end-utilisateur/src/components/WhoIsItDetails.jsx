import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Background from '../images/mario-yoshi-luigi.jpg'
import who from '../who.json'


export default function WhoIsItDetails() {
    const [otherProducts, setOtherProducts] = useState([]);

    useEffect(() => {
        const getOtherProducts = async () => {
            try {
              const response = await axios.get(
                'http://localhost:8080/api/allnewproducts/7'
              );
              setOtherProducts(response.data.reverse());
            } catch (error) {
                console.error(error.response);
            }
        };
        getOtherProducts();
      }, []);
    return (
        <div className="display-global-container">
            <div className="display-details-container">
                <img className="display-details-image" src={Background} alt="luigi-yoshi-and-mario"/>
                <h1 className="display-details-title">{who.title}</h1>
                <p className="display-details-content">{who.content[0]}</p>
                <p className="display-details-content">{who.content[1]}</p>
                <p className="display-details-content">{who.content[2]}</p>
                <p className="display-details-content">{who.content[3]}</p>
                <p className="display-details-content">{who.content[4]}</p>
            </div>
            <div className="display-details-container-right">
                <p className="product-interest">Ces produits pourraient vous intéresser</p>
                <hr></hr>
                <div className="other-products">
                {otherProducts.map((newProduct, index) => (
                <div className="newproducts-right-card" key={index}>
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
