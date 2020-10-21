import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function UsedProductBreadcrumb() {
  const [usedProduct, setUsedProduct] = useState({});
  let {id} = useParams(); 

  useEffect(() => {
    const getUsedProduct = async() =>{
        try {
          const response = await axios.get(
            `http://localhost:8080/api/usedproducts/${id}`
          );
          setUsedProduct(response.data);
        } catch (error) {
          console.error(error);
        }
    };
    getUsedProduct();
  }, [id]);

  return <div className="breadcrumb-container">
          <Link to={"/"} style={{color: 'white', textDecoration:'none'}}>ACCUEIL/</Link>
          <Link to={"/usedproducts"} style={{color: 'white', textDecoration:'none'}}>Produits d'Occasion/</Link>
          <p>{usedProduct.name}</p>
        </div>;
}
