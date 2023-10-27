import React from 'react'
import { useParams } from 'react-router-dom';
import products from './assets/products.json'


export default function ProductPage() {
  const { productID } = useParams();
  const product = products.find((product) => product.id == (productID));
  
  return (
    <>
      <header className="header">
        <a href="/shop/">
        <h1 className="banner">Healthify</h1>
        </a>
      </header>

      <main>
        <h1> Hello, welcome to Healthify</h1>
        <h2>Product: {product.name}</h2>
        <img
          className="product-img"
          src={"../" + product.img_path}
          alt={product.name.replaceAll('-', ' ') +
            // Adds class name only if it is not included in the product name
            (!product.name.toLowerCase().includes(product.class_name.toLowerCase()) ?
              " " + product.class_name : "")
            + " on a white background."}
            width="350" 
            height="350"
          />
        <p>{product.description}</p>
        {product.calories &&
          <p className="product-card-calories">Calories: {product.calories}</p>
          }
          {product.mass &&
          <p className="product-card-mass">Mass: {product.mass}</p>
          }
          {product.volume &&
          <p className="product-card-volume">Volume: {product.volume}</p>
          }

          <p className="product-card-price">Price: ${product.price.toFixed(2)}</p>
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better choices is so rewarding!
        </p>
      </footer>
    </>
  )
}
