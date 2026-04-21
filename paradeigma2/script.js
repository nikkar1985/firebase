// 1. Εισαγωγή των εργαλείων (Προσθέσαμε το updateDoc για το Βήμα 2)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Οι ρυθμίσεις σου
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// 3. Αρχικοποίηση
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "messages", "1");

// --- ΒΗΜΑ 1: ΑΝΑΓΝΩΣΗ (Real-time) ---
onSnapshot(docRef, (doc) => {
    const titleElement = document.getElementById("live-text");
    if (doc.exists()) {
        const data = doc.data();
        titleElement.innerText = data.text;
        console.log("Η βάση άλλαξε:", data.text);
    } else {
        titleElement.innerText = "Το έγγραφο '1' δεν υπάρχει στη συλλογή 'messages'!";
    }
});

// --- ΒΗΜΑ 2: ΕΝΗΜΕΡΩΣΗ (Write) ---

// Σε ένα module, το DOM είναι συνήθως έτοιμο, 
// οπότε στοχεύουμε απευθείας τα στοιχεία.
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

if (button) {
    button.onclick = async () => {
        const newValue = input.value;
        if (!newValue) {
            console.warn("Το πεδίο είναι άδειο!");
            return;
        }

        try {
            console.log("Προσπάθεια ενημέρωσης...");
            await updateDoc(docRef, {
                text: newValue
            });
            input.value = ""; 
            console.log("Η βάση ενημερώθηκε επιτυχώς!");
        } catch (error) {
            console.error("Σφάλμα κατά την εγγραφή:", error);
            alert("Δεν έχεις δικαίωμα εγγραφής! Έλεγξε τους κανόνες (Rules) στο Firebase.");
        }
    };
} else {
    console.error("Δεν βρέθηκε κουμπί με ID 'sendBtn'");
}

