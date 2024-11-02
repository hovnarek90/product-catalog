import React from "react";
import "./ProductList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h4>{product.name}</h4>
          <p>{product.brand}</p>
          <p>${product.price}</p>
          <p className="rating">
            <span className="rating-value"> {product.rating}</span>
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                style={{ color: index < product.rating ? "gold" : "lightgray" }}
              />
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
