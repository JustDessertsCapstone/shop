import React from 'react'
import { Link } from 'react-router-dom';
import './App.css'

import { useEffect } from 'react'
import { gapi } from 'gapi-script'
 
import data from './assets/products.json'
import cartIcon from './assets/google_shopping.svg'
import userIcon from './assets/user-profile-icon.svg'
import UserProfile from './UserProfile'

import SearchBar from './SearchBar'
import { ShoppingCartState, ShoppingCartContainer } from './ShoppingCart'
import { ProductContainerState, ProductContainer } from './ProductContainer'

const clientId = "43903682458-v5dr38m8qmeak6n5unja52qjt065p7p5.apps.googleusercontent.com";

function App() {
  const [cart, addToCart, removeFromCart, clearCart] = ShoppingCartState();
  const [products, setProducts] = ProductContainerState(data);

  // useEffect(() => {
  //   function start() {
  //     gapi.auth2.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   }

  //   gapi.load('client:auth2', start);
  // });

  return (
    <>
      <header className="header">
        <a href="/shop/">
        <h1 className="banner">Healthify</h1>
        </a>
        <img src={cartIcon} alt="Shopping Cart Icon" className="cart-icon" />
        <ShoppingCartContainer data={data} cart={cart} />
        <img src={userIcon} alt="User Profile Icon" className="user-icon" />
        <UserProfile />
      </header>

      <main id="shop-main">
        <h1> Hello, welcome to Healthify</h1>
        <SearchBar data={data} setProducts={setProducts} />
        <br />
        <ProductContainer products={products} cart={cart} addToCart={addToCart} />
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better choices is so rewarding!
        </p>
        <p>
          Learn more about this project, team, and sources, by visiting our&nbsp;
          <Link className="link" to={`/shop/about/`}>About Page</Link>
        </p>
      </footer>
    </>
  )
}

export default App
