
function ProductCard({ product }) {
  return (
     <div className="ProductCard">
        <img
        className="item_img"
        src={product.img_path}
        alt={product.name}
        />
        <h3 className="item_name">{product.name.replaceAll('-', ' ')}</h3>
        {!product.name.toLowerCase().includes(product.class_name.toLowerCase())  &&
        <p className="item_class">{product.class_name}</p>
        }
        <h3>${(Math.random()*4.5+1.5).toFixed(2)}</h3>
     </div>
  );
}

export default function ProductContainer({ data }) {
  return (
    <div className="ProductContainer">
      {data.map(product => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}
