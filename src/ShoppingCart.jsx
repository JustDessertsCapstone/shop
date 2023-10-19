import {useState} from "react";


export function ShoppingCartState() {
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

function getTableRows(data, cart) {
   const mappedCart = new Map(); // holds productIDs and counts

   // if(!Array.isArray(cart)) {console.log("not array"); return <></>}

   cart.forEach(productID => {
      mappedCart.set(productID, mappedCart.get(productID) + 1 || 1);
   })

   return (
      [...mappedCart].map(([productID, quantity]) => {
         const product = data.find(product => product.id === productID);

         return (
            <tr key={product.id}>
               <td>{product.name.replaceAll('-', ' ')}</td>
               <td>{quantity}</td>
            </tr>
         )
      })
   )
}

export function ShoppingCartContainer({ data, cart }) {
   return (
      <div className="shopping-cart">
         <table>
            <thead>
               <tr>
                  <th>Shopping Cart</th>
               </tr>
            </thead>
            <tbody>
               {getTableRows(data, cart)}
            </tbody>
         </table>
      </div>
   )
 }