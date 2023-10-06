import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_0moyvRhNHnhPfzmnam68vS23UtTA8-k",
    authDomain: "lesson6-5a47e.firebaseapp.com",
    projectId: "lesson6-5a47e",
    storageBucket: "lesson6-5a47e.appspot.com",
    messagingSenderId: "980741314406",
    appId: "1:980741314406:web:e5aaefb5c0979bb6399aa7",
    measurementId: "G-F5KJ2V00KZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);