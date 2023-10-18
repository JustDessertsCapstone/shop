import { useState } from 'react'
import './App.css'
import data from './assets/products.json'
import ProductContainer from './ProductContainer'
//added for shoppingCart.js next two lines
//import React from 'react'
//import { cart, addToCart, removeFromCart, clearCart } from './cart';


function App() {
  return (
    <>
      <header>
        <h1 class="banner">Healthify</h1>
      </header>

      <main>
        <h1> Hello, welcome to Healthify</h1>
        <div>
          <ProductContainer data={data} />
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
