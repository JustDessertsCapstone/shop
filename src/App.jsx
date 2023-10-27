import React from 'react'
import './App.css'
import data from './assets/products.json'
import { ProductContainerState, ProductContainer } from './ProductContainer'
import CartIcon from './assets/google_shopping.svg'
import { ShoppingCartState, ShoppingCartContainer } from './ShoppingCart'
import SearchBar from './SearchBar'


function App() {
  const [cart, addToCart, removeFromCart, clearCart] = ShoppingCartState();
  const [products, setProducts] = ProductContainerState(data);

  return (
    <>
      <header className="header">
        <h1 className="banner">Healthify</h1>
        <img src={CartIcon} alt="Shopping Cart Icon" className="cart-icon" />
        <ShoppingCartContainer data={data} cart={cart} />
      </header>

      <main>
        <h1> Hello, welcome to Healthify</h1>
        <SearchBar data={data} setProducts={setProducts} />
        <br />
        <ProductContainer products={products} cart={cart} addToCart={addToCart} />
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
