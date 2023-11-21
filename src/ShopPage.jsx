import React from "react";

import "./App.css";

import data from "./assets/products.json";

import { useProductContainerState } from "./ProductContainer";

import { Header, Footer } from "./Layout"
import { SearchBar } from "./SearchBar";
import { ProductContainer } from "./ProductContainer";


export default function ShopPage(states) {
  const {
    cart, addToCart, removeFromCart,
    popupText, setPopupText,
    user, setUser
  } = states;
  const [products, setProducts] = useProductContainerState(data);

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

      <main id="shop-main">
        <h1> Hello, Welcome to Healthify</h1>
        <SearchBar
          data={data}
          setProducts={setProducts}
        />
        <br />
        <ProductContainer
          products={products}
          addToCart={addToCart}
          setPopupText={setPopupText}
        />
      </main>

      <Footer />
    </>
  );
}
