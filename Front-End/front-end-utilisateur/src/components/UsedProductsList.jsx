import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsedProductLargeCard from './UsedProductLargeCard';
import { useHistory } from 'react-router-dom';

export default function UsedProductsList() {
  const history = useHistory();
  const [allUsedProducts, setAllUsedProducts] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const getUsedProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/usedproducts/'
        );
        setAllUsedProducts(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    getUsedProducts();
  }, []);

  const sellProduct = (e) => {
    e.preventDefault();
    
    if(token){
      history.push("/createannouncement"); 
    }else{
      setDisplayModal(true);
    }
  };  

  return (
    <>
      <div className="search-input">
        {displayModal && 
        <div className="modal">
          <button className="close" onClick={()=> setDisplayModal(!displayModal)}>X</button>
          <div className="modal-text">
            Désolé, vous devez être connecté(e) pour créer une annonce. 
          </div>
        </div>}
        <button className="sell-button" type="button" onClick={sellProduct}>Créer une annonce</button>
      </div>
      <div className="usedproducts-body">
        <div className="usedproducts-body-left"></div>
        <div className="usedproducts-body-right">
          {allUsedProducts.map((usedProduct, index) => (
            <div className="usedproducts-body-right-card" key={index}>
            <UsedProductLargeCard usedProduct={usedProduct} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
