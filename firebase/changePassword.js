import { auth } from './config.js';
import { updatePassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const newPasswordInput = document.getElementById('new-password')
const changeBtn = document.getElementById('change-btn')


const handleChangePassword = () => {
    const user = auth.currentUser;
    updatePassword(user, newPasswordInput.value).then(() => {
        // Update successful.
        alert('Password updated successfully');
      }).catch((error) => {
        alert(error.message);
        console.log(error.stack);
        // An error ocurred
        // ...
      });

}

changeBtn.addEventListener('click', handleChangePassword)