import React from "react";
import { Link, useNavigate } from "react-router-dom";

import data from "./assets/products.json";
import cartIcon from "./assets/google_shopping.svg";
import userIcon from "./assets/user-profile-icon.svg";

import { ShoppingCartContainer } from "./ShoppingCart";
import { OAuthButtons } from "./OAuthButtons";

export function Header({ cart, addToCart, removeFromCart, setUser }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/shop/">
        <h1 className="banner">Healthify</h1>
      </Link>

      { cart && addToCart && removeFromCart ?
        <>
          <img
            onClick={() => navigate("/shop/cart/")}
            src={cartIcon}
            alt="Shopping Cart Icon"
            className="cart-icon"
          />
          <ShoppingCartContainer
            data={data}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </> : <></>
      }

      { setUser ?
        <>
          <img src={userIcon} alt="User Profile Icon" className="user-icon" />
          <OAuthButtons setUser={setUser} />
        </> : <></>
      }
    </header>
  );
}

export function Footer({ includeLink = true }) {
  return (
    <footer>
      <p>
        Within Healthify, you will find that being rewarded for making better
        choices is so rewarding!
      </p>
      { includeLink ?
        <p>
          Learn more about this project, team, and sources, by visiting
          our&nbsp;
          <Link className="link" to="/shop/about/">
            About Page
          </Link>
        </p> : <></>
      }
    </footer>
  );
}
