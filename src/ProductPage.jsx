import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import products from "./assets/products.json";


export default function ProductPage(states) {
  const { cart, addToCart } = states;
  const { productID } = useParams();
  const product = products.find((product) => product.id == productID);

  return (
    <>
      <header className="header">
        <Link to="/shop/">
          <h1 className="banner">Healthify</h1>
        </Link>
      </header>

      <main id="product-page-main">
        <div id="product-page-text">
          <h1> Hello, welcome to Healthify</h1>
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
        </div>
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better
          choices is so rewarding!
        </p>
        <p>
          Learn more about this project, team, and sources, by visiting
          our&nbsp;
          <Link className="link" to="/shop/about/">
            About Page
          </Link>
        </p>
      </footer>
    </>
  );
}
