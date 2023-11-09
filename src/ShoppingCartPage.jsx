import React from "react";
import { getTableRows } from "./ShoppingCart.jsx";
import data from "./assets/products.json"

export default function ShoppingCartPage({ cart }) {
  return (
    <>
      <header className="header">
        <a href="/shop/">
          <h1 className="banner">Healthify</h1>
        </a>
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
