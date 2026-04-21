// 1. Εισαγωγή των απαραίτητων λειτουργιών από το CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Οι δικές σου ρυθμίσεις (αυτές που έστειλες)
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// 3. Αρχικοποίηση της εφαρμογής και της βάσης δεδομένων
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Σύνδεση με το έγγραφο που έφτιαξες (Collection: messages, ID: 1)
const docRef = doc(db, "messages", "1");

// 5. Real-time παρακολούθηση: Όταν αλλάζεις κάτι στο Firebase, θα αλλάζει αυτόματα στην οθόνη
onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
        const data = doc.data();
        // Εδώ το data.text αντιστοιχεί στο πεδίο "text" που έφτιαξες στο Firestore
        document.getElementById("live-text").innerText = data.text;
        console.log("Νέα δεδομένα:", data.text);
    } else {
        document.getElementById("live-text").innerText = "Το έγγραφο δεν βρέθηκε!";
    }
});
