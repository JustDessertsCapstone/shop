import { useState } from "react";

const mappedCart = new Map(); // holds productIDs and counts

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

export function getTableRows(data, cart) {
  if (cart.length === 0)
    return (
      <tr key={0}>
        <td>Cart Empty</td>
      </tr>
    );


  cart.forEach((productID) => {
    mappedCart.set(productID, mappedCart.get(productID) + 1 || 1);
  });

  return [...mappedCart].map(([productID, quantity]) => {
    const product = data.find((product) => product.id === productID);

    return (
      <tr key={product.id}>
        <td>{product.name.replaceAll("-", " ")}</td>
        <td>{quantity}</td>
      </tr>
    );
  });
}
let totalCost = 0;

const cartRows = [...mappedCart].map(([productID, quantity]) => {
  const product = data.find((product) => product.id === productID);
  totalCost += product.price * quantity;

  return (
    <tr key={product.id}>
      <td>{product.name.replaceAll("-", " ")}</td>
      <td>{quantity}</td>
      <td>${product.price}</td>
      <td>${product.price * quantity}</td>
      <td>
        <button onClick={() => removeFromCart(product.id)}>Remove</button>
      </td>
    </tr>
  );
});

cartRows.push(
  <tr key="total">
    <td colSpan="3">Total:</td>
    <td>${totalCost}</td>
    <td></td>
  </tr>
);


export function ShoppingCartContainer({ data, cart }) {
  return (
    <div className="shopping-cart">
      <table>
        <thead>
          <tr>
            <th>Shopping Cart</th>
          </tr>
        </thead>
        <tbody>{getTableRows(data, cart)}</tbody>
      </table>
    </div>
  );
}
