import { useState } from "react";


export function useShoppingCartState() {
  const [cart, setCart] = useState([]);

  const addToCart = (productID) => {
    setCart([...cart, productID]);
  };

  const removeFromCart = (productID) => {
    const index = cart.findIndex((id) => id === productID);

    cart.splice(index, 1);
    setCart([...cart])
  };

  const clearCart = () => {
    setCart([]);
  };

  return [cart, addToCart, removeFromCart, clearCart];
}

export function getTableRows(data, cart, addToCart, removeFromCart) {
  if (cart.length === 0)
    return (
      <tr key={0}>
        <td>Cart Empty</td>
      </tr>
    );

  const mappedCart = new Map(); // holds productIDs and counts
  let totalCost = 0;

  cart.forEach((productID) => {
    mappedCart.set(productID, mappedCart.get(productID) + 1 || 1);
  });

  return [...mappedCart].map(([productID, quantity]) => {
    const product = data.find((product) => product.id === productID);

    totalCost += product.price * quantity;

    return (
      <tr key={product.id}>
        <td>{product.name.replaceAll("-", " ")}</td>
        <td>
          <button
            className="remove-product-arrow"
            onClick={() => removeFromCart(product.id)}
          >
            {String.fromCharCode(8592)}
          </button>
        </td>
        <td>{quantity}</td>
        <td>
          <button
            className="add-product-arrow"
            onClick={() => addToCart(product.id)}
          >
            {String.fromCharCode(8594)}
          </button>
        </td>
        {/* <td>${product.price}</td> */}
        <td>${(product.price * quantity).toFixed(2)}</td>
      </tr>
    );
  });
}

export function getTotalCost(data, cart) {
  let totalCost = 0;

  cart.forEach((productID) => {
    const product = data.find((product) => product.id === productID);

    totalCost += product.price;
  });

  return totalCost.toFixed(2);
}

export function ShoppingCartContainer({ data, cart, addToCart, removeFromCart }) {
  return (
    <div className="shopping-cart">
      <table>
        <thead>
          <tr>
            <th>Shopping Cart</th>
          </tr>
        </thead>
        <tbody>
          {getTableRows(data, cart, addToCart, removeFromCart)}
          {cart.length !== 0 ?
            <tr key="total">
              <td colSpan="4">Total:</td>
              <td>${getTotalCost(data, cart)}</td>
              <td></td>
            </tr> : <></>
          }
        </tbody>
      </table>
    </div>
  );
}
