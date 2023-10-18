import {useState} from "react";


export function ShoppingCartState(){
   const [cart, setCart] = useState([]);

   const addToCart = (product) => {
      setCart([...cart, product]);
   };

   const removeFromCart = (index) => {
      const updateCart = [...index];
      updateCart.splice(index, 1);
      setCart(updateCart);
   };

   const clearCart = () => {
      setCart([]);
   };

   return [cart, addToCart, removeFromCart, clearCart];
}

export function ShoppingCartContainer({ data }) {
   return (
     <div className="product-container">
       {data.map(product => (
         <ProductCard product={product} />
       ))}
     </div>
   );
 }