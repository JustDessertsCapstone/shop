import { jwtDecode } from "jwt-decode"
import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

function LoginButton({ setUser }) {

  const onSuccess = (res) => {
    setUser(jwtDecode(res["credential"]));
  };

  const onFailure = (res) => {
    console.log("Login Failed");
  };
  
  return (
    <GoogleLogin id="signInButton" onSuccess={onSuccess} onError={onFailure} />
  );
}

function LogoutButton({ setUser }) {
  const signOut = () => {
    googleLogout();
    setUser([]);
  };

  const onSuccess = () => {
    console.log("Logout Successful");
  };

  return (
    <button id="signOutButton" onClick={signOut}>
      Sign Out
    </button>
  );
}

export function UserState() {
  const [ user, setUser ] = useState([]);

  return [ user, setUser ];
}

export function OAuthButtons({ setUser }) {
  return (
    <div className="oath-buttons">
      <p>Please Sign In:</p>
      <LoginButton setUser={setUser} />
      {/* <LogoutButton setUser={setUser} /> */}
    </div>
  );
}
