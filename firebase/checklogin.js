import { auth } from './config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location = "./login.html";
    }
});