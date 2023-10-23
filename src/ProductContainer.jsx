import {useState} from "react";


function ProductCard({ product, addToCart }) {
  return (
     <div className="product-card">
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

        {/* Set Fixed Prices. Mostly just to get that out of the way. -TK */}
        <h3 className="product-card-price">${(product.price).toFixed(2)}</h3>
        <button onClick={() => addToCart(product.id)}>Add To Cart</button>
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
