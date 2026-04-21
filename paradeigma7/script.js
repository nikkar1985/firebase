import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    onSnapshot,
    query, // Απαραίτητο για τη δημιουργία ερωτημάτων
    where  // Απαραίτητο για τον ορισμό των φίλτρων (π.χ. ηλικία > 30)
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. Δημιουργούμε την αναφορά στη συλλογή "students"
const colRef = collection(db, "students");


const q = query(colRef, where("age", ">", 40));


onSnapshot(q, (snapshot) => {
    const container = document.getElementById("users-list");
    
    if (!container) {
        console.error("Δεν βρέθηκε το στοιχείο με id 'users-list' στο HTML.");
        return;
    }

   
    container.innerHTML = "";

    
    if (snapshot.empty) {
        container.innerHTML = "<p>Δεν βρέθηκαν μαθητές με ηλικία άνω των 30.</p>";
        return;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        const userId = doc.id;
        
        const userDiv = document.createElement("div");
        userDiv.className = "user-card";
        
        // CSS στυλ μέσω JavaScript
        userDiv.style.marginBottom = "15px";
        userDiv.style.padding = "10px";
        userDiv.style.border = "1px solid #ddd";
        userDiv.style.borderRadius = "8px";
        userDiv.style.backgroundColor = "#f9f9f9";

        // Εμφάνιση των στοιχείων του μαθητή
        userDiv.innerHTML = `
            <p><strong>ID:</strong> ${userId}</p>
            <p><strong>Όνομα:</strong> ${data.name}</p>
            <p><strong>Επώνυμο:</strong> ${data.surname}</p>
            <p><strong>Ηλικία:</strong> ${data.age}</p>
        `;

        container.appendChild(userDiv);
    });
});
