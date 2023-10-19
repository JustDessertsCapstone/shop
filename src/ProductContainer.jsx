
function ProductCard({ product, addToCart }) {
  return (
     <div className="product-card" role="button" onClick={() => addToCart(product.id)}>
        <img
        className="product-card-img"
        src={product.img_path}
        alt={product.name.replaceAll('-', ' ') +
          // Adds class name only if it is not included in the product name
          (!product.name.toLowerCase().includes(product.class_name.toLowerCase()) ?
            " " + product.class_name : "")
          + " on a white background."}
          // onClick={() => addToCart(product.id)}
        />
        
        <h3 className="product-card-name">{product.name.replaceAll('-', ' ')}</h3>

        {/* Displays class name only if it is not included in the product name  */}
        {!product.name.toLowerCase().includes(product.class_name.toLowerCase())  &&
        <p className="product-card-class">{product.class_name}</p>
        }

        {/* Price uses a temporary price, until we fill the prices out */}
        <h3 className="product-card-price">${(Math.random()*4.5+1.5).toFixed(2)}</h3>
     </div>
  );
}

export default function ProductContainer({ data, addToCart }) {
  return (
    <div className="product-container">
      {data.map(product => (
        <ProductCard product={product} key={product.id} addToCart={addToCart} />
      ))}
    </div>
  );
}
