import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function NewProductBreadcrumb() {
  const [newProduct, setNewProduct] = useState({});
  let {id} = useParams(); 

  useEffect(() => {
    const getNewProduct = async() =>{
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
  }, [id]);

  return <div className="breadcrumb-container">
          <Link to={"/"} style={{color: 'white', textDecoration:'none'}}>ACCUEIL/</Link>
          <Link to={"/newproducts"} style={{color: 'white', textDecoration:'none'}}>Produits Neufs/</Link>
          <p>{newProduct.name}</p>
        </div>;
}
