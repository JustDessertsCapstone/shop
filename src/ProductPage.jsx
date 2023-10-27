import React from 'react'
import { useParams } from 'react-router-dom';
import products from './assets/products.json'


export default function ProductPage() {
  const { productID } = useParams();
  const product = products.find((product) => product.id == (productID));
  
  return (
    <>
      <header className="header">
        <h1 className="banner">Healthify</h1>
      </header>

      <main>
        <h1> Hello, welcome to Healthify</h1>
        <p>Product: {product.name}</p>
        <a href="/shop/">Home</a>
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better choices is so rewarding!
        </p>
      </footer>
    </>
  )
}
