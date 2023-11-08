import { auth, db} from './config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const usernameElm = document.getElementById('username');
const passwordElm = document.getElementById('password');
const registerBtn = document.getElementById('register-btn');

const ref = collection(db, "user");
const q = query(ref, orderBy('createdAt'));
const addUser = async(user) => {
    const email = usernameElm.value;
    if(email.value !== ""){
        await addDoc(ref, {
            email: email,
            friends:[],
            createdAt: serverTimestamp(),
        });
    }
};

const handleRegister = () => {
    const email = usernameElm.value;
    const password = passwordElm.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const email = user.email;
            const displayName = user.displayName;
            const photoURL = user.photoURL;
            const userProfile = {
                email,
                displayName,
                photoURL
            }
            localStorage.setItem("currentUser", JSON.stringify(userProfile));
            alert("Sign in successfully");
            window.location = './login.html';
            // Signed in 

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode);
        });
}

registerBtn.addEventListener('click', addUser);
registerBtn.addEventListener('click', handleRegister);