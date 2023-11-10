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
          email.innerHTML = user.email;
          if(user.photoURL === ""){
            Image.src = "https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png";
          }else {
            Image.src = user.photoURL;
          }

        }
      });
}
handleGetProfile();
