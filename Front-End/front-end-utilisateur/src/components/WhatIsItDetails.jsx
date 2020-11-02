import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Background from '../images/nintendo-4684999_1920.jpg';
import what from '../what.json'

export default function WhatIsItDetails() {
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
                <img className="display-details-image" src={Background} alt="game-boy-dans-le-caniveau"/>
                <h1 className="display-details-title">{what.title}</h1>
                <p className="display-details-content">{what.content[0]}</p>
                <p className="display-details-content">{what.content[1]}</p>
                <p className="display-details-content">{what.content[2]}</p>
                <p className="display-details-content">{what.content[3]}</p>
                <p className="display-details-content">{what.content[4]}</p>
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
