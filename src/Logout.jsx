import { GoogleLogout } from 'react-google-login';

const clientId = "43903682458-v5dr38m8qmeak6n5unja52qjt065p7p5.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Logout Successful");
    }

    return(
        <div id="signInButton">
            <GoogleLogout
                clientId={clientId}
                butonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;