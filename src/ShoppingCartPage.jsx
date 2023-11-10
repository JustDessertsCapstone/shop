import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import data from "./assets/products.json";

import { getTableRows } from "./ShoppingCart.jsx";
import { search } from "./SearchBar";
import { ProductCard } from "./ProductContainer"


// Durstenfeld shuffle - Copied from https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function getSuggestedProducts(cart) {
  const classes = [];

  // Get all unique product classes from cart
  cart.forEach((productID) => {
    const product = data.find((product) => product.id === productID);
    
    if (!classes.includes(product.class_name))
      classes.push(product.class_name);
  });

  // Get all other products with the same classes as found in cart
  const suggestedProducts = data.filter((product) => {
    return !cart.includes(product.id) &&
      classes.includes(product.class_name);
  });

  shuffleArray(suggestedProducts);

  return suggestedProducts;
}

function SuggestedProducts({ products, addToCart }) {
  const [numElements, setNumElements] = useState(products.length);

  const updateNumElements = () => {
    const suggestedProductsElement = document.getElementById("shopping-cart-page-suggested-products");

    setNumElements(Math.floor(suggestedProductsElement.clientWidth / 198));
  }

  useEffect(() => {
    window.addEventListener("resize", updateNumElements, false);
  }, []);  

  return (
    <div
      id="shopping-cart-page-suggested-products"
      onLoad={updateNumElements}
    >
      {products.slice(0, numElements).map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default function ShoppingCartPage(states) {
  const { cart, addToCart, removeFromCart, clearCart } = states;

  return (
    <>
      <header className="header">
        <Link to="/shop/">
          <h1 className="banner">Healthify</h1>
        </Link>
      </header>

      <main id="shopping-cart-page-main">
        <div className="shopping-cart-page-item-list">
          <h1>Shopping Cart</h1>
          <table>
            <thead>
              <tr>
                <th>Shopping Cart</th>
              </tr>
            </thead>
            <tbody>{getTableRows(data, cart)}</tbody>
          </table>
        </div>

        <br />

        <div className="shopping-cart-page-suggestions">
          <h2>Recommended Products</h2>
          <p>
            Based on your shopping cart, we recommend the following products:
          </p>
          <SuggestedProducts
            products={getSuggestedProducts(cart)}
            addToCart={addToCart}
          />
        </div>
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better
          choices is so rewarding!
        </p>
      </footer>
    </>
  );
}
