import {useState} from "react";


function ProductCard({ product, addToCart }) {
  return (
     <div className="product-card">
        <div className="product-card-front">
          <img
          className="product-card-img"
          src={product.img_path}
          alt={product.name.replaceAll('-', ' ') +
            // Adds class name only if it is not included in the product name
            (!product.name.toLowerCase().includes(product.class_name.toLowerCase()) ?
              " " + product.class_name : "")
            + " on a white background."}
            onClick={() => location.href="/shop/product/"}
          />
          
          <h3 className="product-card-name" onClick={() => location.href="/shop/product/"}>{product.name.replaceAll('-', ' ')}</h3>

          {/* Displays class name only if it is not included in the product name  */}
          {!product.name.toLowerCase().includes(product.class_name.toLowerCase())  &&
          <p className="product-card-class">{product.class_name}</p>
          }

          <h3 className="product-card-price">${product.price.toFixed(2)}</h3>
        </div>

        <div className="product-card-back">
          <h3><u>{product.name.replaceAll('-', ' ')}</u></h3>
          <p style={{fontSize:"10px"}}>Description: {product.description}</p>
          {product.mass &&
          <p>Mass: {product.mass}</p>
        }
          {product.volume &&
          <p>Volume: {product.volume}</p>
        }
          <p>Price: ${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product.id)}>Add To Cart</button>
        </div>
     </div>
  );
}

export function ProductContainerState(products) {
  return useState(products);
}

export function ProductContainer({ products, addToCart }) {
  return (
    <div className="product-container">
      {products.map(product => (
        <ProductCard product={product} key={product.id} addToCart={addToCart} />
      ))}
    </div>
  );
}
