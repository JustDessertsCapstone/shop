import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import db from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; 
import { auth } from "./firebase";

function LoginButton({ setUser }) {
  const [user, setUserExists] = useState(null);

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

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log("sign out successful");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
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