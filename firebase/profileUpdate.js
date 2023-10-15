import { auth } from './config.js';
import { updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const submitBtn = document.getElementById('submit-btn');
const user = auth.currentUser;
const name = document.getElementById('name');
const photo = document.getElementById('photo');

const handleprofile = () => {
    updateProfile(auth.currentUser, {
        displayName: name.value, photoURL: photo.value
      }).then(() => {
        alert('Profile updated successfully');
        // Profile updated!
        // ...
       }).catch((error) => {
        alert(error.message);
        // An error occurred
        // ...
    });
}
const handleGetProfile = () => {
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
      if (user) {
        name.value = user.displayName;
        photo.value = user.photoURL;

      }
    });
}
handleGetProfile();



submitBtn.addEventListener('click', handleprofile);

