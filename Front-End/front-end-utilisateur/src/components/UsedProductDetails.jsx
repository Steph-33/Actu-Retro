import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function UsedProductDetails() {
    const [usedProduct, setUsedProduct] = useState({});
    const [otherProducts, setOtherProducts] = useState([]);
    const date = new Date();
    const date_of_announcement = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let {id} = useParams(); 
    const [displayModal, setDisplayModal] = useState(false);
    
    useEffect(() => {
      const getUsedProduct = async() =>{
          try {
            const response = await axios.get(
              `http://localhost:8080/api/usedproducts/${id}`
            );
            setUsedProduct(response.data);
            console.log('response.data ==========> ',response.data);
          } catch (error) {
            console.error(error);
          }
      };
      getUsedProduct();
      const getOtherProducts = async () => {
          try {
            const response = await axios.get(
              'http://localhost:8080/api/allusedproducts/3'
            );
            setOtherProducts(response.data.reverse());
          } catch (error) {
              console.error(error.response);
          }
      };
      getOtherProducts();
    }, [id]);


    const token = localStorage.getItem('token');

    const sellProduct = (e) => {
        e.preventDefault();
        
        if(token){
            console.log({token});
        }else{
            setDisplayModal(true);
        }
    };  

    return (
        <div className="details-container">
            
                    {displayModal && 
                    <div className="modal">
                        <button className="close" onClick={()=> setDisplayModal(!displayModal)}>X</button>
                        <div className="modal-text">
                            Désolé, vous devez être connecté(e) pour créer une annonce. 
                        </div>
                    </div>}
            
            <div className="details-container-left" onClick={sellProduct}>
                <button className="sell-button" type="button">Créer une annonce</button>
            </div>
            <div className="details-container-middle">
                <img className="detail-image" src={usedProduct.image} alt="Product"/>
                <p className="detail-date">Annonce mise en ligne le {date_of_announcement}</p>
                <p className="detail-name">{usedProduct.name}</p>
                <p className="detail-price">{usedProduct.price}€</p>
                <p className="detail-state">{usedProduct.state}</p>
                <p className="detail-description">Description</p>
                <p className="detail-content">{usedProduct.description}</p>
                <p className="detail-location">Localisation : {usedProduct.location}</p>
                <p className="detail-contact">Contact : {usedProduct.contact}</p>
            </div>
            
            <div className="details-container-right">
                <div className="details-container-right-top" >
                    <p className="product-interest">Ce produit vous intéresse ? </p>
                    <button className="buy-button" type="button">Acheter</button>
                    <Link to={'/usedproducts/'} style={{ textDecoration: 'none' }}><button className="back-button">Revenir à la liste</button></Link>
                </div>
                <div className="details-container-right-bottom">
                    <p className="product-interest">Annonces qui pourraient vous intéresser</p>
                    <hr></hr>
                    {otherProducts.map((usedProduct, index) => (
                    <div className="newproducts-right-card" key={index}>
                        <Link to={`/usedproducts/${usedProduct.id}`} style={{ textDecoration: 'none' }}>
                            <img className="newproducts-right-card-image" src={usedProduct.image} alt="image-produit"/>
                            <div className="newproducts-right-card-name-price">
                                <p className="detail-name">{usedProduct.name}</p>
                                <p className="detail-price">{usedProduct.price}€</p>
                            </div>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
