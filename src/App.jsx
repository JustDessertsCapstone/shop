import React from 'react'
import { Link } from 'react-router-dom';
import './App.css'

import data from './assets/products.json'
import cartIcon from './assets/google_shopping.svg'

import SearchBar from './SearchBar'
import { ShoppingCartState, ShoppingCartContainer } from './ShoppingCart'
import { ProductContainerState, ProductContainer } from './ProductContainer'


function App() {
  const [cart, addToCart, removeFromCart, clearCart] = ShoppingCartState();
  const [products, setProducts] = ProductContainerState(data);

  return (
    <>
      <header className="header">
        <a href="/shop/">
        <h1 className="banner">Healthify</h1>
        </a>
        <img src={cartIcon} alt="Shopping Cart Icon" className="cart-icon" />
        <ShoppingCartContainer data={data} cart={cart} />
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
