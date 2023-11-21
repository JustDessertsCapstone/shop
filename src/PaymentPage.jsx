import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import data from "./assets/products.json";

import { getTableRows, getTotalCost } from "./ShoppingCart";
import { ProductCard } from "./ProductContainer"
import { Header, Footer } from "./Layout";


export default function PaymentPage(states) {
  const {
    cart, addToCart, removeFromCart, clearCart,
    setUser
  } = states;

  return (
    <>
      <Header setUser={setUser}/>

      <main id="payment-page-main">
        <div className="payment-page-item-list">
          <h1>Order Placement</h1>
          { cart.length !== 0 ?
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th colSpan="3">Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {getTableRows(data, cart, addToCart, removeFromCart)}
                { cart.length !== 0 ?
                  <tr key="total">
                    <td colSpan="4">Total:</td>
                    <td>${getTotalCost(data, cart)}</td>
                  </tr> : <></>
                }
              </tbody>
              <button className="place-order">PlaceOrder</button>
            </table> :
            <>
              <p>Your shopping cart is empty.</p>
              <Link to="/shop/">
                <p>Go to Shop Page</p>
              </Link>
            </>
          }
        </div>
      </main>

      <Footer />
    </>
  );
}
