import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import db from "./firebase";
import { collection, getDoc, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { auth } from "./firebase";

function LoginButton({ user, setUser }) {
  const addUserToBD = async (userRef, name) => {
    try {
      const docSnapshot = await getDoc(userRef);
      
      if (!docSnapshot.exists()) {
        console.log("User not in DB. Adding user.");
        
        await setDoc(userRef, {
          name: name,
          cart: [],
          balance: 100.00,
          points: 0,
          lifetimePoints: 0
        });
      } else {
        console.log("User already in DB.");
        
        const userData = docSnapshot.data();

        if (!userData.lifetimePoints)
          await updateDoc(user.ref, { lifetimePoints: userData.points });
        console.log(userData)
        if (!userData.name)
          await updateDoc(user.ref, { name: name });
        
        user.balance = userData.balance;
        user.points = userData.points;
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
    }
  };

  const onSuccess = async (res) => {
    const decodedCredentials = jwtDecode(res["credential"]);
    const userSub = decodedCredentials.sub;
    const userRef = doc(collection(db, 'Users'), userSub);
    
    decodedCredentials.ref = userRef;
    user = decodedCredentials;
    
    await addUserToBD(userRef, decodedCredentials.name);

    setUser(user);
  };

  const onFailure = (res) => {
    console.log("Login Failed");
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      googleLogout();
      console.log("sign out successful");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ?
        <>
          <p>You are signed in as<br />{user.name}</p>
          <button onClick={signOut}>Sign Out</button>
        </> :
        <>
          <p>You are signed out.<br />Please sign in to continue:</p>
          <GoogleLogin id="signInButton" onSuccess={onSuccess} onError={onFailure} />
        </>
      }
    </div>
  );
}

export function useUserState() {
  const [ user, setUser ] = useState(null);

  return [ user, setUser ];
}

export function OAuthButtons({ user, setUser }) {
  return (
    <div className="oath-buttons">
      <LoginButton user={user} setUser={setUser} />
    </div>
  );
}