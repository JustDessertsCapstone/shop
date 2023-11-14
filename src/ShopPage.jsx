import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

import data from "./assets/products.json";
import cartIcon from "./assets/google_shopping.svg";
import userIcon from "./assets/user-profile-icon.svg";

import { ProductContainerState } from "./ProductContainer";

import { SearchBar } from "./SearchBar";
import { ShoppingCartContainer } from "./ShoppingCart";
import { ProductContainer } from "./ProductContainer";
import { OAuthButtons } from "./OAuthButtons";


export default function ShopPage(states) {
  const {
    cart, addToCart, removeFromCart, 
    setUser
  } = states;
  const [products, setProducts] = ProductContainerState(data);

  return (
    <>
      <header className="header">
        <Link to="/shop/">
          <h1 className="banner">Healthify</h1>
        </Link>
        <Link to="/shop/cart/">
          <img src={cartIcon} alt="Shopping Cart Icon" className="cart-icon" />
          <ShoppingCartContainer
            data={data}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Link>
        <img src={userIcon} alt="User Profile Icon" className="user-icon" />
        <OAuthButtons
          setUser={setUser}
        />
      </header>

      <main id="shop-main">
        <h1> Hello, welcome to Healthify</h1>
        <SearchBar
          data={data}
          setProducts={setProducts}
        />
        <br />
        <ProductContainer
          products={products}
          addToCart={addToCart}
        />
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
