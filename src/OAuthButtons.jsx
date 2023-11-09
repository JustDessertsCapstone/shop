import { jwtDecode } from "jwt-decode"
import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

export function UserState() {
  const [ user, setUser ] = useState([]);

  return [ user, setUser ];
}

export function OAuthButtons(setUser) {
  const LoginButton = () => {
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

  const LogoutButton = () => {
    const signOut = () => {
      googleLogout();
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

  return (
    <div className="oath-buttons">
      <p>Please Sign In:</p>
      <LoginButton />
      {/* <LogoutButton /> */}
    </div>
  );
}
