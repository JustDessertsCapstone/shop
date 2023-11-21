import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { useShoppingCartState } from "./ShoppingCart";
import { useUserState } from "./OAuthButtons";
import { useProductAddedPopUp } from "./ProductAddedPopUp"

import ShopPage from "./ShopPage.jsx";
import ProductPage from "./ProductPage.jsx";
import AboutPage from "./AboutPage.jsx";
import ShoppingCartPage from "./ShoppingCartPage.jsx";

import db from "./firebase"

function App() {
  const [user, setUser] = useUserState();
  const [cart, addToCart, removeFromCart, clearCart] = useShoppingCartState(db, user);
  const [productPopup, setProductPopup] = useProductAddedPopUp();
  
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
                productPopup={productPopup}
                setProductPopup={setProductPopup}
                user={user}
                setUser={setUser}
              />
            }/>
            <Route path="/shop/product/:productID" element={
              <ProductPage
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                productPopup={productPopup}
                setProductPopup={setProductPopup}
                user={user}
                setUser={setUser}
              />}
            />
            <Route path="/shop/about/" element={<AboutPage />} />
            <Route path="/shop/cart/" element={
              <ShoppingCartPage
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                user={user}
                setUser={setUser}
              />}
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
