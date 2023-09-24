import { auth } from './config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const signoutBtn = document.getElementById('logout-btn');

const handlesignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location = './login.html';
    }).catch((error) => {
        // An error happened.
    });
}

signoutBtn.addEventListener('click', handlesignOut);