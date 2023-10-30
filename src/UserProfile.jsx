import { GoogleLogin, googleLogout } from '@react-oauth/google';


function LoginButton() {
   const onSuccess = (res) => {
      console.log("Login Successful");
   }

   const onFailure = (res) => {
      console.log("Login Failed");
   }

    return <GoogleLogin id="signInButton" onSuccess={onSuccess} onError={onFailure} />
}

function LogoutButton() {
   const signOut = () => {
      googleLogout();
   }

    const onSuccess = () => {
        console.log("Logout Successful");
    }

    return(
        <button id="signOutButton" onClick={signOut}>
            Sign Out
        </button>
    )
}

export default function UserProfile() {
   return (
      <div className="user-profile">
         <p>Please Sign In:</p>
         <LoginButton />
         {/* <LogoutButton /> */}
      </div>
   )
}
