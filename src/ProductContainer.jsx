import { useState } from "react";
import { Link } from "react-router-dom";


function ProductCard({ product, cart, addToCart }) {
  return (
    <div className="product-card">
      <div className="product-card-front">
        <img
          className="product-card-img"
          src={product.img_path}
          alt={
            product.name.replaceAll("-", " ") +
            // Adds class name only if it is not included in the product name
            (!product.name
              .toLowerCase()
              .includes(product.class_name.toLowerCase())
              ? " " + product.class_name
              : "") +
            " on a white background."
          }
        />

        <h3
          className="product-card-name"
          onClick={() => (location.href = "/shop/product/")}
        >
          {product.name.replaceAll("-", " ")}
        </h3>

        {/* Displays class name only if it is not included in the product name  */}
        {!product.name
          .toLowerCase()
          .includes(product.class_name.toLowerCase()) && (
          <p className="product-card-class">{product.class_name}</p>
        )}

        <h3 className="product-card-price">${product.price.toFixed(2)}</h3>
      </div>

      <div className="product-card-back">
        <h3 className="product-card-name">
          {product.name.replaceAll("-", " ")}
        </h3>

        <p className="product-card-description">
          Description: {product.description}
        </p>
        {product.calories && (
          <p className="product-card-calories">Calories: {product.calories}</p>
        )}
        {product.mass && (
          <p className="product-card-mass">Mass: {product.mass}</p>
        )}
        {product.volume && (
          <p className="product-card-volume">Volume: {product.volume}</p>
        )}

        <p className="product-card-price">Price: ${product.price.toFixed(2)}</p>

        <button
          className="product-card-add"
          onClick={() => addToCart(product.id)}
        >
          Add to cart
        </button>

        <Link className="link" to={`/shop/product/${product.id}`}>
          Go to Product Page
        </Link>
      </div>
    </div>
  );
}

export function ProductContainerState(products) {
  return useState(products);
}

export function ProductContainer({ products, cart, addToCart }) {
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          cart={cart}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
