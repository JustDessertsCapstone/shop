import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import data from "./assets/products.json";

import { getTableRows, getTotalCost } from "./ShoppingCart";
import { ProductCard } from "./ProductContainer"
import { Header, Footer } from "./Layout";


// Durstenfeld shuffle - Copied from https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function getSuggestedProducts(cart) {
  const classes = [];

  // Get all unique product classes from cart
  cart.forEach((productID) => {
    const product = data.find((product) => product.id === productID);
    
    if (!classes.includes(product.class_name))
      classes.push(product.class_name);
  });

  // Get all other products with the same classes as found in cart
  const suggestedProducts = data.filter((product) => {
    return !cart.includes(product.id) &&
      classes.includes(product.class_name);
  });

  shuffleArray(suggestedProducts);

  return suggestedProducts;
}

function useSuggestedProducts(cart) {
  const [suggestedProducts, setSuggestedProducts] = useState(getSuggestedProducts(cart));

  useEffect(() => {
    const newSuggestedProducts = getSuggestedProducts(cart);

    if (newSuggestedProducts.length !== suggestedProducts.length)
      setSuggestedProducts(newSuggestedProducts);
  }, [cart]);

  return { suggestedProducts };
}

function SuggestedProducts({ products, addToCart }) {
  const [numElements, setNumElements] = useState(products.length);

  const updateNumElements = () => {
    const suggestedProductsElement = document.getElementById("shopping-cart-page-suggested-products");

    setNumElements(Math.floor(suggestedProductsElement.clientWidth / 198));
  }

  useEffect(() => {
    window.addEventListener("resize", updateNumElements, false);
  }, []);  

  return (
    <div
      id="shopping-cart-page-suggested-products"
      onLoad={updateNumElements}
    >
      {products.slice(0, numElements).map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default function ShoppingCartPage(states) {
  const {
    cart, addToCart, removeFromCart, clearCart,
    user, setUser
  } = states;
  const { suggestedProducts } = useSuggestedProducts(cart);
  const navigate = useNavigate();

  return (
    <>
      <Header user={user} setUser={setUser}/>

      <main id="shopping-cart-page-main">
        <div className="shopping-cart-page-item-list">
          <h1>Shopping Cart</h1>
          { cart.length === 0 ?
            <>
              <p>Your shopping cart is empty.</p>
              <Link className="link" to="/shop/">
                <p>Go to Shop Page</p>
              </Link>
            </> :
            <>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th colSpan="3">Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {getTableRows(cart, addToCart, removeFromCart)}
                  { cart.length !== 0 &&
                    <tr key="total">
                      <td colSpan="4">Total:</td>
                      <td>${getTotalCost(cart)}</td>
                    </tr>
                  }
                </tbody>
              </table>
              <div className="shopping-cart-buttons">
                <button
                  className="checkout-button"
                  onClick={() => navigate("/shop/payment/")}
                >
                  Checkout
                </button>
                <button
                  className="clear-cart-button"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </button>
              </div>
            </>
          }
        </div>

        <br />

        { suggestedProducts.length !== 0 &&
          <div className="shopping-cart-page-suggestions">
            <h2>Recommended Products</h2>
            <p>
              Based on your shopping cart, we recommend the following products:
            </p>
            <SuggestedProducts
              products={suggestedProducts}
              addToCart={addToCart}
            />
          </div>
        }
      </main>

      <Footer />
    </>
  );
}
