import { useState, useEffect } from "react";
import { getDoc, updateDoc } from "firebase/firestore";

export function useShoppingCartState(db, user) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart([]);
        return;
      }
      if (!db) return;

      try {
        const userDoc = await getDoc(user.ref);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedCart = cart.concat(userData.cart);

          setCart(updatedCart);
          await updateDoc(user.ref, { cart: updatedCart });
        }
      } catch (error) {
        console.error("Error fetching or updating cart:", error);
      }
    };

    fetchCart();
  }, [db, user]);

  const addToCart = async (productID) => {
    const updatedCart = [...cart, productID];
    setCart(updatedCart);
    
    if (!user) return;
    if (!db) return;
    
    try {
      await updateDoc(user.ref, { cart: updatedCart });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productID) => {
    const index = cart.findIndex((id) => id === productID);

    cart.splice(index, 1);
    setCart([...cart])

    if (!user) return;
    if (!db) return;

    try {
      await updateDoc(user.ref, { cart: cart });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    setCart([]);

    if (!user) return;
    if (!db) return;

    try {
      await updateDoc(user.ref, { cart: [] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
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
        {removeFromCart &&
          <td>
            <button
              className="remove-product-arrow"
              onClick={() => removeFromCart(product.id)}
            >
              {String.fromCharCode(8592)}
            </button>
          </td>
        }
        <td colSpan={addToCart ? "1" : "3"}>{quantity}</td>
        {addToCart &&
          <td>
            <button
              className="add-product-arrow"
              onClick={() => addToCart(product.id)}
            >
              {String.fromCharCode(8594)}
            </button>
          </td>
        }
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

function calculatePoints(data, productID) {
  const product = data.find((product) => product.id === productID);
  const grade = product.nutrition_grade;

  if (grade === 'a') return product.price * 0.10  * 100;
  if (grade === 'b') return product.price * 0.075 * 100;
  if (grade === 'c') return product.price * 0.05  * 100;
  if (grade === 'd') return product.price * 0.025 * 100;
  if (grade === 'e') return product.price * 0.01  * 100;

  console.log("Unknown grade for " + product.name);
  return 0;
}

export function calculatePointTotal(data, cart) {
  let pointTotal = 0;

  cart.forEach((productID) => pointTotal += calculatePoints(data, productID));

  return pointTotal.toFixed(0);
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
          { cart.length !== 0 &&
            <tr key="total">
              <td colSpan="4">Total:</td>
              <td>${getTotalCost(data, cart)}</td>
              <td></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
