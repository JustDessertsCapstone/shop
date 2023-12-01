import React from "react";
import { Link, useNavigate } from "react-router-dom";

import cartIcon from "./assets/google_shopping.svg";
import userIcon from "./assets/user-profile-icon.svg";
import leaderboardIcon from "./assets/podium.svg";

import { ShoppingCartContainer } from "./ShoppingCart";
import { OAuthButtons } from "./OAuthButtons";
import { Popup } from "./Popup"

export function Header(states) {
  const {
    cart, addToCart, removeFromCart,
    user, setUser,
    popupText, popupTextGood = true,
    showLeaderBoard = false
  } = states;
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/shop/">
        <h1 className="banner">Healthify</h1>
      </Link>

      { popupText !== undefined &&
        <Popup popupText={popupText} popupTextGood={popupTextGood} />
      }

      { showLeaderBoard &&
        <Link to="/shop/leaderboard/" className="leaderboard-link">
          <img src={leaderboardIcon} alt="Leaderboard Icon" className="leaderboard-icon" />
        </Link>
      }

      { cart && addToCart && removeFromCart &&
        <>
          <img
            onClick={() => navigate("/shop/cart/")}
            src={cartIcon}
            alt="Shopping Cart Icon"
            className="cart-icon"
          />
          <ShoppingCartContainer
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </>
      }

      { setUser &&
        <>
          {user
            ? <img src={user.picture} alt="User Profile Icon" className="user-icon" />
            : <img src={userIcon} alt="User Profile Icon" className="user-icon" />
          }
          <OAuthButtons user={user} setUser={setUser} />
        </>
      }
    </header>
  );
}

export function Footer({ includeLink = true }) {
  return (
    <footer>
      <p>
        Within Healthify, you will find that being rewarded for making better
        choices is so rewarding!
      </p>
      { includeLink &&
        <p>
          Learn more about this project, team, and sources, by visiting
          our&nbsp;
          <Link className="link" to="/shop/about/">
            About Page
          </Link>
        </p>
      }
    </footer>
  );
}
