import { React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDoc, updateDoc } from "firebase/firestore";

import { getTableRows, getTotalCost, calculatePointTotal } from "./ShoppingCart";
import { Header, Footer } from "./Layout";


export default function PaymentPage(states) {
  const {
    cart, clearCart,
    user, setUser,
    popupText, setPopupText
  } = states;
  const [ purchaseMade, setPurchaseMade ] = useState(false);

  const updateUser = async (moneySpent, pointsToAdd) => {
    const newBal = user.balance - moneySpent;
    const newPoints = user.points + pointsToAdd;
  
    setUser({ ...user, balance: newBal, points: newPoints});
    
    try {
      const userDoc = await getDoc(user.ref);
  
      if (userDoc.exists()) {
        await updateDoc(user.ref, { balance: newBal, points: newPoints });
      }
    } catch (error) {
      console.error("Error fetching or updating cart:", error);
    }
  }

  const handlePurchase = (usingBal) => {
    let money = usingBal ? parseFloat(getTotalCost(cart)) : 0;
    let points = usingBal ? parseFloat(calculatePointTotal(cart)) : parseFloat(getTotalCost(cart)) * -100;
    
    if (
      (usingBal  && user.balance < money) ||
      (!usingBal && user.points + points < 0)
    ) {
        console.log("Purchase Unsuccessful : Insufficient Funds");
        setPopupText("Purchase Unsuccessful : Insufficient Funds");
        
        return;
    }

    console.log("Purchase Successful!");
    updateUser(money, points);
    clearCart();
    setPurchaseMade(true);
  }
  const navigate = useNavigate();

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        popupText={popupText}
        popupTextGood={false}
      />

      <main id="payment-page-main">
        <div className="payment-page-item-list">
          {purchaseMade ? 
            <>
              <h1>Thank you for your purchase!</h1>
              <h2>Your order will be shipped soon.</h2>
              <p>Your new balance is ${user.balance.toFixed(2)}.</p>
              <p>Your new point total is {user.points.toFixed(0)}.</p>
              <p>Thank you for shopping with us!</p>

              <Link className="link" to="/shop/">
                <p>Continue Shopping</p>
              </Link>
            </> :
          !user ?
            <>
              <h1>Please log in to place an order.</h1>

              <Link className="link" to="/shop/">
                <p>Go to Shop Page</p>
              </Link>
            </> :
            <>
              <h1>Order Placement</h1>

              <p>Current Balance: ${user.balance.toFixed(2)}</p>
              {user.points !== 0 &&
                <>
                  <p>Points Earned: {user.points.toFixed(0)}</p>
                  <small>$1 = 100 points</small>
                </>
              }

              <h2>Your Order</h2>
              { cart.length === 0 ?
                <>
                  <p>Your shopping cart is empty.</p>
                  <Link className="link" to="/shop/">
                    <p>Go to Shop Page</p>
                  </Link>
                </> :
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th colSpan="3">Quantity</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTableRows(cart)}
                      { cart.length !== 0 &&
                        <>
                          <tr key="total">
                            <td>Total:</td>
                            <td colSpan="3"></td>
                            <td>${getTotalCost(cart)}</td>
                          </tr>
                          <tr key="points">
                            <td>Points Gained:</td>
                            <td colSpan="3"></td>
                            <td>{calculatePointTotal(cart)}</td>
                          </tr>
                        </>
                      }
                    </tbody>
                  </table>

                  <div className="place-order-buttons">
                    <button
                      className="return-to-cart-button"
                      onClick={() => navigate("/shop/cart/")}
                    >
                      Return to Cart
                    </button>

                    <button
                      className="place-order-button"
                      onClick={() => handlePurchase(true)}
                    >
                      Place Order
                    </button>

                    {user.points + parseFloat(getTotalCost(cart)) * -100 >= 0 &&
                      <button
                        className="place-order-points-button"
                        onClick={() => handlePurchase(false)}
                      >
                        Place Order Using Points
                      </button>
                    }
                  </div>
                </>
              }
            </>}
        </div>
      </main>

      <Footer />
    </>
  );
}
