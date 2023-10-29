import { auth } from './config.js';
import { signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const provider = new FacebookAuthProvider();
const loginwithfacebookbtn = document.getElementById('btn-Facebook');


const handleLoginWithfacebookAuth = () => {
    signInWithPopup(auth, provider)
    .then((result) => {

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const user = result.user;
        const email = user.email;
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        const userProfile = {
            email,
            displayName,
            photoURL
        }
        localStorage.setItem("currentUser", JSON.stringify(userProfile));
        alert(`${user.email} sign in successfully`)
        window.location = "./index.html";

        // IdP data available using getAdditionalUserInfo(result)
        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
    });
}
  loginwithfacebookbtn.addEventListener("click", handleLoginWithfacebookAuth);
