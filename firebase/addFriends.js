import { db } from "./config.js";
import {
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const user = [];
const q = query(collection(db, "user"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  const sender = localStorage.getItem("currentUser");
  const userProfile = JSON.parse(sender);
  const userData = doc.data();
  // Check if user.email is equal to userProfile.email
  if (userData.email !== userProfile.email) {
    user.push(userData);
  }
});
console.log(user);

const addFriend = async (userEmail) => {
  const refInvite = collection(db, "invite");
  const qInvite = query(refInvite);
  const sender = localStorage.getItem("currentUser");
  const userProfile = JSON.parse(sender);
  await addDoc(refInvite, {
    receiver: userEmail,
    sender: userProfile.email,
    createdAt: serverTimestamp(),
  });
};

const userList = document.getElementById("user-list");
const renderUser = () => {
  user.forEach((user) => {
    const userEmail = user.email;
    const template = document.getElementById("user-template");
    const userElm = template.content.cloneNode(true);
    userElm.getElementById("user-email").textContent = userEmail;
    const addFriendBtn = userElm.getElementById("add-friend");
    if (addFriendBtn) {
      addFriendBtn.addEventListener("click", () => addFriend(userEmail));
    }
    userList.appendChild(userElm);
  });
};
renderUser(user);
