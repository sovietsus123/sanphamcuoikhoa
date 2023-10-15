import { auth } from './config.js';
import { updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const Name = document.getElementById('fullname');
const Image = document.getElementById('image');
const email = document.getElementById('email');
const user = auth.currentUser;

const handleGetProfile = () => {
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
          Name.innerHTML = user.displayName;
          Image.src = user.photoURL;
          email.innerHTML = user.email;

        }
      });
}
handleGetProfile();
