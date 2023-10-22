import { db } from "./config.js"
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

let messagesList = []

const ref = collection(db, "messages");
const q = query(ref, orderBy('createdAt'));

const inputMessage = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");

const sender = localStorage.getItem("currentUser");
const userProfile = JSON.parse(sender);
console.log(userProfile);

// add the message
const addMessage = async() => {
    const message = inputMessage.value;
    await addDoc(ref, {
        content: message,
        sender: userProfile.displayName ? userProfile.displayName : userProfile.email,
        image: userProfile.photoURL ? userProfile.photoURL : "https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png",
        createdAt: serverTimestamp(),
    });
}
sendBtn.addEventListener("click", addMessage);

const handleDeleteMessage = async (id) => {
  await deleteDoc(doc(db, "messages", id));
}
//render messages
const messageDiv = document.getElementById("message-list");
const renderMessages = () => {
  messageDiv.innerHTML = "";
  messagesList.forEach((message) => {
    if (message.sender == userProfile.displayName || message.sender == userProfile.email) {
      const template = document.getElementById('my-message');
      const messageElm = template.content.cloneNode(true); 
      messageElm.getElementById('message-content').textContent = message.content;
      messageElm.getElementById('delete-btn').addEventListener("click", () => handleDeleteMessage(message.id));
      messageDiv.appendChild(messageElm);
    }else{
      const template = document.getElementById('message-template');
      const messageElm = template.content.cloneNode(true); 
      messageElm.getElementById('message-avatar').src = message.image;
      messageElm.getElementById('message-name').textContent = message.sender;
      messageElm.getElementById('message-content').textContent = message.content;
      messageDiv.appendChild(messageElm);
    };
  });
}

onSnapshot(q, (querySnapshot) => {
  messagesList = [];
  querySnapshot.forEach((doc) => {
      messagesList.push({...doc.data(), id: doc.id});
  });
  renderMessages();
});