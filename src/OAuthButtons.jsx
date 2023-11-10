import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore"; 

function LoginButton({ setUser }) {

  const onSuccess = (res) => {
    setUser(jwtDecode(res["credential"]));

    let decodedCredentials = (jwtDecode(res["credential"]));
    let stringCredentials = (JSON.stringify(decodedCredentials));
    let subStart = stringCredentials.search("sub") + 3;
    let subLength = 21;
    let userSub = stringCredentials.substr(subStart + 3, subLength);

    try {
      const docRef = addDoc(collection(db, "Users"), {
        name: "",  // we need to ask them for their name, or we can use what is given from the google OAuth
        sub: userSub,
        points: 0  // defaulted to 0 points
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
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
