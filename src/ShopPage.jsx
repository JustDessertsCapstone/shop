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
    productPopup, setProductPopup,
    user, setUser
  } = states;
  const [products, setProducts] = useProductContainerState(data);

  return (
    <>
      <Header
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        productPopup={productPopup}
        user={user}
        setUser={setUser}
      />

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
          setProductPopup={setProductPopup}
        />
      </main>

      <Footer />
    </>
  );
}
