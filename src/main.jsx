import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import data from "./assets/products.json";

import { ShoppingCartState } from "./ShoppingCart";
import { ProductContainerState } from "./ProductContainer";
import { UserState } from "./OAuthButtons";

import ShopPage from "./ShopPage.jsx";
import ProductPage from "./ProductPage.jsx";
import AboutPage from "./AboutPage.jsx";
import ShoppingCartPage from "./ShoppingCartPage.jsx";


function App() {
  const [cart, addToCart, removeFromCart, clearCart] = ShoppingCartState();
  const [products, setProducts] = ProductContainerState(data);
  const [user, setUser] = UserState();
  
  return (
    <GoogleOAuthProvider clientId="43903682458-v5dr38m8qmeak6n5unja52qjt065p7p5.apps.googleusercontent.com">
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/shop/" element={
              <ShopPage
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                products={products}
                setProducts={setProducts}
                setUser={setUser}
              />
            }/>
            <Route path="/shop/product/:productID" element={
              <ProductPage
                cart={cart}
                addToCart={addToCart}
              />}
            />
            <Route path="/shop/about/" element={<AboutPage />} />
            <Route path="/shop/cart/" element={
              <ShoppingCartPage
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />}
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
