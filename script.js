import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "atiku-support.firebaseapp.com",
  projectId: "atiku-support",
  storageBucket: "atiku-support.firebasestorage.app",
  messagingSenderId: "871116443693",
  appId: "1:871116443693:web:4c9758622c44ada0b068a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form
const form = document.getElementById("supportForm");

// Photo Input
const photoInput = document.getElementById("photo");

// Load Total Supporters
async function loadSupporterCount() {
  const snapshot = await getDocs(collection(db, "supporters"));
  document.getElementById("supporterCount").textContent = snapshot.size;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = photoInput.files[0];

  if (!file) {
    alert("Please upload your photo.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function () {

    const supporter = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      state: document.getElementById("state").value,
      lga: document.getElementById("lga").value,
      ward: document.getElementById("ward").value,
      pollingUnit: document.getElementById("pollingUnit").value,
      gender: document.getElementById("gender").value,
      occupation: document.getElementById("occupation").value,
      photo: reader.result
    };

    try {

      await addDoc(collection(db, "supporters"), {
        name: supporter.name,
        phone: supporter.phone,
        state: supporter.state,
        lga: supporter.lga,
        ward: supporter.ward,
        pollingUnit: supporter.pollingUnit,
        gender: supporter.gender,
        occupation: supporter.occupation,
        createdAt: new Date()
      });

      localStorage.setItem("supporter", JSON.stringify(supporter));

      window.location.href = "badge.html";

    } catch (error) {

      alert(error.message);

    }

  };

  reader.readAsDataURL(file);

});
// WhatsApp Share Button
const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
  shareBtn.addEventListener("click", () => {

    const text =
      "I have joined the I SUPPORT Hon. ATIKU movement for Keffi West 2027. Join me today!";

    window.open(
      "https://wa.me/?text=" + encodeURIComponent(text),
      "_blank"
    );

  });
}

// Refresh supporter count after registration
loadSupporterCount();