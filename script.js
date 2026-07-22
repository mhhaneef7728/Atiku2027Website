import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFqueiUkNm4-h3m0ZnSDE1kn1ThXa_ylc",
  authDomain: "atiku-support.firebaseapp.com",
  projectId: "atiku-support",
  storageBucket: "atiku-support.firebasestorage.app",
  messagingSenderId: "871116443693",
  appId: "1:871116443693:web:4c9758622c44ada0b068a4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Registration Form
const form = document.getElementById("supportForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();


  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const state = document.getElementById("state").value;
  const lga = document.getElementById("lga").value;
  const ward = document.getElementById("ward").value;
  const pollingUnit = document.getElementById("pollingUnit").value;
  const gender = document.getElementById("gender").value;
  const occupation = document.getElementById("occupation").value;


  try {

    await addDoc(collection(db, "supporters"), {

      name,
      phone,
      state,
      lga,
      ward,
      pollingUnit,
      gender,
      occupation,
      createdAt: new Date()

    });


    alert("Registration successful. Thank you for supporting Hon. ATIKU!");

    form.reset();


    // Restore fixed values
    document.getElementById("state").value = "Nasarawa State";
    document.getElementById("lga").value = "Keffi";


    // Update supporter count
    loadSupporterCount();


  } catch (error) {

    alert("Error: " + error.message);

  }

});


// Load supporter count
async function loadSupporterCount() {

  const snapshot = await getDocs(collection(db, "supporters"));

  document.getElementById("supporterCount").textContent = snapshot.size;

}


loadSupporterCount();


// WhatsApp Share Button
document.getElementById("shareBtn").addEventListener("click", () => {

  const text =
    "I SUPPORT Hon. ATIKU! Register now and join the movement for Keffi West.";


  window.open(
    "https://wa.me/?text=" + encodeURIComponent(text),
    "_blank"
  );

});