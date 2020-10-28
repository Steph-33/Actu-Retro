import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
    const [newProduct, setNewProduct] = useState({});
    const [otherProducts, setOtherProducts] = useState([]);
    const date = new Date();
    const date_of_order = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let {id} = useParams(); 
    const [displayOkModal, setDisplayOkModal] = useState(false);
    const [displayKoModal, setDisplayKoModal] = useState(false);
    
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
    }, [id]);


    // Code pour acheter un produit
    const token = localStorage.getItem('token');
    const order = JSON.stringify({date_of_order:`${date_of_order}`, products:[{"id":`${id}`,"quantity":1}], total_price:`${newProduct.price}`});

    const buyProduct = (e) => {
        e.preventDefault();
        var config = {
            method: 'post',
            url: 'http://localhost:8080/api/orders',
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data : order
        };
        
        if(token){
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
            setDisplayOkModal(true);
        }else{
            setDisplayKoModal(true);
        }
    };  
    return (
        <div className="details-container">
            <div className="modals">
                    {displayOkModal && 
                    <div className="modal">
                        <button className="close" onClick={()=> setDisplayOkModal(!displayOkModal)}>X</button>
                        <div className="modal-text">
                            Votre achat a bien été enregistré.<br></br>
                            Votre colis vous sera livré sous un délai de 3 jours. 
                        </div>
                    </div>}
                    {displayKoModal && 
                    <div className="modal">
                        <button className="close" onClick={()=> setDisplayKoModal(!displayKoModal)}>X</button>
                        <div className="modal-text">
                            Désolé, vous devez être connecté(e) pour effectuer un achat. 
                        </div>
                    </div>}
            </div>
            <div className="details-container-left">
                <img className="detail-image" src={newProduct.image} alt="Product"/>
                <p className="detail-name">{newProduct.name}</p>
                <p className="detail-price">{newProduct.price}€</p>
                <p className="detail-description">Description</p>
                <p className="detail-content">{newProduct.description}</p>
            </div>
            <div className="details-container-right" onClick={buyProduct}>
                <div className="details-container-right-top" >
                    <p className="product-interest">Ce produit vous intéresse ? </p>
                    <button className="buy-button" type="button">Acheter</button>
                    <Link to={'/newproducts/'} style={{ textDecoration: 'none' }}><button className="back-button">Revenir à la liste</button></Link>
                </div>
                <div className="details-container-right-bottom">
                    <p className="product-interest">Annonces qui pourraient vous intéresser</p>
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
        </div>
    )
}
