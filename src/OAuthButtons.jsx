import { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import db from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; 

function LoginButton({ setUser }) {
  const [userExists, setUserExists] = useState(false);

  const checkUserExistence = async (subValue) => {
    try {
      const q = query(collection(db, 'Users'), where('sub', '==', subValue));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("User doesn't exist");
        
        await addDoc(collection(db, 'Users'), {
          sub: subValue,
          cart: null,
          points: 0
        });
        
        setUserExists(false);
      } else {
        console.log("User exists.");
        setUserExists(true);
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  };

  const onSuccess = async (res) => {
    const decodedCredentials = jwtDecode(res["credential"]);
    const userSub = decodedCredentials.sub;
    
    await checkUserExistence(userSub);
    
    setUser(decodedCredentials);
  };

  const onFailure = (res) => {
    console.log("Login Failed");
  };

  return (
    <div>
      <GoogleLogin id="signInButton" onSuccess={onSuccess} onError={onFailure} />
    </div>
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

export function useUserState() {
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
