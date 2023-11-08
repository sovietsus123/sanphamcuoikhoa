import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { auth, db } from "./config.js";

const usernameElm = document.getElementById("username");
const passwordElm = document.getElementById("password");
const registerBtn = document.getElementById("register-btn");

const ref = collection(db, "user");
const addUser = async (user) => {
  console.log(user);
  await addDoc(ref, {
    email: user.email,
    friends: [],
    createdAt: serverTimestamp(),
  });
  window.location = "./login.html";
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
        photoURL,
      };
      localStorage.setItem("currentUser", JSON.stringify(userProfile));
      alert("Register is successfully");
      addUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
};
registerBtn.addEventListener("click", handleRegister);