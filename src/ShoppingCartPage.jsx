import React from "react";
import { getTableRows } from "./shoppingCart.jsx";

function ShoppingCartPage({ data, cart }) {
  return (
    <div className="shopping-cart-page">
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {getTableRows(data, cart)}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingCartPage;
