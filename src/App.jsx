import React from 'react'
import './App.css'
import data from './assets/products.json'
import ProductContainer from './ProductContainer'
import CartIcon from './assets/google_shopping.svg'
import { ShoppingCartState, ShoppingCartContainer } from './ShoppingCart'


function App() {
  const [cart, addToCart, removeFromCart, clearCart] = ShoppingCartState()

  return (
    <>
      <header className="header">
        <h1 class="banner">Healthify</h1>
        <img src={CartIcon} alt="Shopping Cart" className="cart-icon" />
      </header>

      <p>
        Cart is {cart} {/* this is for testing purposes*/}
      </p>

      <main>
        <h1> Hello, welcome to Healthify</h1>
        <form id="form" role="search">
          <input type="search" id="query" name="q" placeholder="Search...">
          </input>
          <button> Search </button>
        </form>
        <div>
          <ProductContainer data={data} addToCart={addToCart} />
        </div>
        
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better choices is so rewarding!
        </p>
      </footer>
    </>
  )
}

export default App
