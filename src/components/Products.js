import React, { useState } from "react";
import Fade, { Zoom } from 'react-reveal'
import Modal from 'react-modal'
import formatCurrency from "../Util";
function Products(props) {
  const [product, setProduct] = useState(null);
  
  const openModal = (product) => {
    setProduct(product)
    console.log(product.availableSizes);
  }
  
  const closeModal = () => {
    // const forProd = {
    //   product: null
    // }
    setProduct(null)
  }
  return (
    <div>
      <Fade bottom cascade>
        <ul className='products'>
          {props.products.map((product) => (
            <li key={product._id}>
              <div className='product'>
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
                <div className='product-price'>
                  <div>{formatCurrency(product.price)}</div>
                  <button onClick={() => props.addToCart(product)} className='button primary'>Add To Cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className='close-modal' onClick={closeModal}>x</button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p><strong>{product.title}</strong></p>
                <p>{product.description}</p>
                <p>
                  Available Sizes:{" "}
                  {product.availableSizes?.map((item) => (
                    <span> 
                      {" "}
                      <button className='button'>{item}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>
                    {formatCurrency(product.price)}
                  </div>
                  <button className="button primary" onClick={() => {props.addToCart(product); closeModal()}}>Add To Cart</button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
}

export default Products;
