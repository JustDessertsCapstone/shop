import { GoogleLogin } from 'react-google-login';

const clientId = "43903682458-v5dr38m8qmeak6n5unja52qjt065p7p5.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res) => {
        console.log("Login Successful");
    }

    const onFailure = (res) => {
        console.log("Login Failed");
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                butonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;