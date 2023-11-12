import { db } from "./config.js";
import { collection, query, getDocs, addDoc, updateDoc, serverTimestamp, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const sender = localStorage.getItem("currentUser");
const userProfile = JSON.parse(sender);
const currentUser = userProfile.email
const q = query(collection(db, "invite"), where("receiver", "==", currentUser));
const querySnapshot = await getDocs(q);

const acceptFriend = async (userEmail, currentUser) => {
    // Update friend list
    const userRef = collection(db, "user");
    const userQuery = query(userRef, where("email", "==", currentUser));
    const data = await getDocs(userQuery);
    const updateUserRef = doc(db, "user", data.docs[0].id);
    await updateDoc(updateUserRef, {
        friends: [userEmail]
    });

    // Xoa invite
    // const inviteRef = collection(db, "invite");
    // const inviteQuery = query(inviteRef, where("receiver", "==", currentUser), where("sender", "==", userEmail));
    // const inviteQuerySnapshot = await getDocs(inviteQuery);

    // const inviteDoc = inviteQuerySnapshot.docs[0];
    // await deleteDoc(inviteRef.doc(inviteDoc.id));
}


const userList = document.getElementById("request-list");
const renderRequest = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const userEmail = data.sender;
        console.log(userEmail);
        const template = document.getElementById("user-template");
        const userElm = template.content.cloneNode(true);
        userElm.getElementById("user-email").textContent = userEmail;
        const acceptFriendBtn = userElm.getElementById("add-friend");

        if (acceptFriendBtn) {
            const sender = localStorage.getItem("currentUser");
            const userProfile = JSON.parse(sender);
            const currentUser = userProfile.email
            acceptFriendBtn.addEventListener("click", () => acceptFriend(userEmail, currentUser));
        }

        userList.appendChild(userElm);
    });
}

renderRequest(querySnapshot);
