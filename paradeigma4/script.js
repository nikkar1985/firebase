import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "users", "4");

// --- ΒΗΜΑ 1: ΑΝΑΓΝΩΣΗ (Real-time) ---
onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
        const data = doc.data();
        document.getElementById("user-name").innerText = data.name ;
        document.getElementById("user-age").innerText = data.age ;
        document.getElementById("user-status").innerText = data.isOnline ? " Online" : " Offline";
      document.getElementById("user-nikname").innerText = data.nikname ;
    } else {
        console.log("Το έγγραφο δεν υπάρχει!");
    }
}); 
