import { db } from "./config.js"
import {  collection, query, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const user = [];
const q = query(collection(db, "user"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  user.push(doc.data());
});
console.log(user);

const userList = document.getElementById("user-list");
const renderUser = () => {
    user.forEach((user) => {
      const template = document.getElementById('user-template');
      const userElm = template.content.cloneNode(true); 
      userElm.getElementById('user-email').textContent = user.email;
      userList.appendChild(userElm);
    });
}
renderUser();



