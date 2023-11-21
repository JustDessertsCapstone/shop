import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import db from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; 
import { auth } from "./firebase";

function LoginButton({ setUser }) {
  const [isSignedIn, setSignedIn] = useState(false);

  const checkUserExistence = async (subValue) => {
    try {
      const q = query(collection(db, 'Users'), where('sub', '==', subValue));
      const querySnapshot = await getDocs(q);
      console.log(subValue);  //for demo

      if (querySnapshot.size === 0) {
        console.log("User not in DB. Adding user.");
        
        await addDoc(collection(db, 'Users'), {
          sub: subValue,
          cart: null,
          points: 0
        });
      } else {
        console.log("User already in DB.");
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
    setSignedIn(true);
  };

  const onFailure = (res) => {
    console.log("Login Failed");
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      googleLogout();
      setSignedIn(false);
      console.log("sign out successful");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {isSignedIn ? (
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are signed out. Please sign in to continue:</p>
          <GoogleLogin id="signInButton" onSuccess={onSuccess} onError={onFailure} />
        </div>
      )}
    </div>
  );
}

export function useUserState() {
  const [ user, setUser ] = useState([]);

  return [ user, setUser ];
}

export function OAuthButtons({ setUser }) {
  return (
    <div className="oath-buttons">
      <LoginButton setUser={setUser} />
    </div>
  );
}