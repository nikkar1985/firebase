import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    onSnapshot,
    query, 
    where,
    orderBy,
    limit 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Ρυθμίσεις Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "3",
    appId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Δημιουργούμε την αναφορά στη συλλογή "students"
const colRef = collection(db, "students");

ν
const q = query(
    colRef, 
    where("age", ">", 30), 
    where("age", "<", 50),
    orderBy("age", "desc"), 
    limit(2) 
);

onSnapshot(q, (snapshot) => {
    const container = document.getElementById("users-list");
    
    if (!container) {
        console.error("Δεν βρέθηκε το στοιχείο με id 'users-list' στο HTML.");
        return;
    }

    container.innerHTML = "";

    if (snapshot.empty) {
        container.innerHTML = "<p>Δεν βρέθηκαν μαθητές σε αυτό το εύρος ηλικίας.</p>";
        return;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        const userId = doc.id;
        
        const userDiv = document.createElement("div");
        userDiv.className = "user-card";
        
        // Στυλ
        userDiv.style.marginBottom = "15px";
        userDiv.style.padding = "10px";
        userDiv.style.border = "1px solid #ddd";
        userDiv.style.borderRadius = "8px";
        userDiv.style.backgroundColor = "#f9f9f9";

        userDiv.innerHTML = `
            <p><strong>ID:</strong> ${userId}</p>
            <p><strong>Όνομα:</strong> ${data.name}</p>
            <p><strong>Επώνυμο:</strong> ${data.surname}</p>
            <p><strong>Ηλικία:</strong> ${data.age}</p>
        `;

        container.appendChild(userDiv);
    });
}, (error) => {
    // Διαχείριση σφαλμάτων (π.χ. αν λείπει το Index)
    console.error("Σφάλμα κατά την ανάκτηση δεδομένων: ", error);
});
