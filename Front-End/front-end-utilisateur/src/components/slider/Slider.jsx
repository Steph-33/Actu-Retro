import React, { useRef } from "react";
import {Link} from 'react-router-dom';
import useSlider from "./userSlider";

const Slider = ({ images }) => {
  const slideImage = useRef(null)
  const slideText = useRef(null)
  const slideTitle = useRef(null)
  const { goToPreviousSlide, goToNextSlide } = useSlider(
    slideImage,
    slideTitle,
    slideText,
    images
  )

  return (
    <div className="slider" ref={slideImage} style={{
      // backgroundImage: `url(${newProduct})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '80vh',
      width:'100vw'
    }}>
      <div className="slider--content">
        <div className="slider--feature">
          <h1 ref={slideTitle} className="feature--title"></h1>
          <p ref={slideText} className="feature--text"></p>
          <Link to="/newproducts"><button className="enterButton" type="button">Entrez</button></Link>
        </div>
        <div className="slider-buttons">
          <button onClick={goToPreviousSlide} className="slider__btn-left">&#60;</button>
          <button onClick={goToNextSlide} className="slider__btn-right">&#62;</button>
        </div>
      </div>
    </div>
  )
}

export default Slider