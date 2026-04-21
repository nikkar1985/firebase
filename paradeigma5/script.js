import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Ρυθμίσεις Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Αρχικοποίηση Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Αναφορά στη συλλογή "users"
const colRef = collection(db, "users");

/**
 * --- ΑΝΑΓΝΩΣΗ ΟΛΩΝ ΤΩΝ ΕΓΓΡΑΦΩΝ (Real-time) ---
 * Χρησιμοποιούμε την onSnapshot στη συλλογή για να λαμβάνουμε 
 * ενημερώσεις κάθε φορά που προστίθεται, διαγράφεται ή αλλάζει ένας χρήστης.
 */
onSnapshot(colRef, (snapshot) => {
    // Υποθέτουμε ότι υπάρχει ένα στοιχείο στο HTML με id="users-list"
    const container = document.getElementById("users-list");
    
    if (!container) {
        console.error("Δεν βρέθηκε το στοιχείο με id 'users-list' στο HTML.");
        return;
    }

    // Καθαρισμός του container για να μην εμφανίζονται διπλότυπα κατά την ανανέωση
    container.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();
        const userId = doc.id; //η
        const userDiv = document.createElement("div");
        userDiv.className = "user-card"; // 
        userDiv.style.marginBottom = "15px";
        userDiv.style.padding = "10px";
        userDiv.style.border = "1px solid #ddd";
        userDiv.style.borderRadius = "8px";

      
      userDiv.innerHTML = `
            <p><strong>ID:</strong> ${userId}</p>
            <p><strong>Όνομα:</strong> ${data.name || 'Χωρίς όνομα'}</p>
            <p><strong>Nickname:</strong> ${data.nikname || 'N/A'}</p>
            <p><strong>Ηλικία:</strong> ${data.age || '-'}</p>
            <p><strong>Status:</strong> ${data.isOnline ? "🟢 Online" : "🔴 Offline"}</p>
        `;

        container.appendChild(userDiv);
      
      
        
    });
});
