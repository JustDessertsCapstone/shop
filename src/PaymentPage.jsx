import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import data from "./assets/products.json";

import { getTableRows, getTotalCost } from "./ShoppingCart";
import { Header, Footer } from "./Layout";


export default function PaymentPage(states) {
  const {
    cart,
    user
  } = states;

  return (
    <>
      <Header/>

      <main id="payment-page-main">
        <div className="payment-page-item-list">
          <h1>Order Placement</h1>
          { cart.length !== 0 ?
            <>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th colSpan="3">Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {getTableRows(data, cart)}
                  { cart.length !== 0 &&
                    <tr key="total">
                      <td>Total:</td>
                      <td colSpan="3"></td>
                      <td>${getTotalCost(data, cart)}</td>
                    </tr>
                  }
                </tbody>
              </table>
              <button className="place-order-button">PlaceOrder</button>
            </> :
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
