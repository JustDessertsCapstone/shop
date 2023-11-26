import React from "react";
import { useParams } from "react-router-dom";

import products from "./assets/products.json";

import { Header, Footer } from "./Layout";


export default function ProductPage(states) {
  const {
    cart, addToCart, removeFromCart,
    popupText, setPopupText,
    user, setUser
  } = states;
  const { productID } = useParams();
  const product = products.find((product) => product.id == productID);

  return (
    <>
      <Header
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        popupText={popupText}
        user={user}
        setUser={setUser}
      />

      <main id="product-page-main">
        <div id="product-page-text">
          <h2>Product: {product.name}</h2>
          <img
            className="product-img"
            src={"../" + product.img_path}
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
            width="350"
            height="350"
          />
          <p>{product.description}</p>
          {product.calories && (
            <p className="product-page-calories">Calories: {product.calories}</p>
          )}
          {product.mass && (
            <p className="product-page-mass">Mass: {product.mass}</p>
          )}
          {product.volume && (
            <p className="product-page-volume">Volume: {product.volume}</p>
          )}

          <p className="product-page-price">Price: ${product.price.toFixed(2)}</p>

          <button
            className="product-card-add"
            onClick={() => {
              addToCart(product.id)
              setPopupText(product.name.replaceAll("-", " ") + " was added to your cart");
            }}
          >
            Add to cart
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
