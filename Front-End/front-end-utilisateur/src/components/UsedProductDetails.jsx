import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';

export default function UsedProductDetails() {
    const history = useHistory();
    const [usedProduct, setUsedProduct] = useState({});
    const [otherProducts, setOtherProducts] = useState([]);
    const date = new Date();
    const date_of_announcement = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    let {id} = useParams(); 
    const [displayModal, setDisplayModal] = useState(false);
    const token = localStorage.getItem('token');

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

    const sellProduct = (e) => {
        e.preventDefault();
    
        if(token){
            history.push("/createannouncement");             
        }else{
            setDisplayModal(true);
        }
    };  
    return (
        <div className="details-usedproduct-container">      
                    {displayModal && 
                    <div className="modal">
                        <button className="close" onClick={()=> setDisplayModal(!displayModal)}>X</button>
                        <div className="modal-text">
                            Désolé, vous devez être connecté(e) pour créer une annonce. 
                        </div>
                    </div>}
            <div className="details-usedproduct-container-left" ></div>
            <div className="details-usedproduct-container-middle">
                <img className="detail-image" src={usedProduct.image} alt="Product"/>
                <p className="detail-date">Annonce mise en ligne le {date_of_announcement}</p>
                <p className="detail-name">{usedProduct.name}</p>
                <p className="detail-price">{usedProduct.price}€</p>
                <p className="detail-state">État : {usedProduct.state}</p>
                <p className="detail-description">Description</p>
                <p className="detail-content">{usedProduct.description}</p>
                <p className="detail-location">Localisation : {usedProduct.location}</p>
                <p className="detail-contact">Contact : {usedProduct.contact}</p>
            </div>
            
            <div className="details-usedproduct-container-right">
                <div className="details-usedproduct-container-right-top" >
                    <p className="product-interest">Que souhaitez-vous faire ?</p>
                    <button className="buy-button" type="button" onClick={sellProduct}>Créer une annonce</button>
                    <Link to={'/usedproducts/'} style={{ textDecoration: 'none' }}><button className="back-button">Revenir à la liste</button></Link>
                </div>
                <div className="details-usedproduct-container-right-bottom">
                    <p className="product-interest">Annonces qui pourraient vous intéresser</p>
                    {otherProducts.map((usedProduct, index) => (
                    <div className="usedproducts-right-card" key={index}>
                        <Link to={`/usedproducts/${usedProduct.id}`} style={{ textDecoration: 'none' }}>
                            <img className="usedproducts-right-card-image" src={usedProduct.image} alt="image-produit"/>
                            <div className="usedproducts-right-card-name-price">
                                <p className="usedproduct-detail-name">{usedProduct.name}</p>
                                <div className="usedproduct-detail-price">
                                    <p>{usedProduct.price}€</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
