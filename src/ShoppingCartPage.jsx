import React from "react";
import { Link } from "react-router-dom";

import data from "./assets/products.json";

import { getTableRows } from "./ShoppingCart.jsx";


export default function ShoppingCartPage(states) {
  const { cart, addToCart, removeFromCart, clearCart } = states;
  console.log(cart);

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
