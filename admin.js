// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
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

async function loadSupporters(search = "") {
  try {
    const table = document.getElementById("supportersTable");
    table.innerHTML = "";

    let tudun = 0;
    let gangaren = 0;
    let yara = 0;
    let iya1 = 0;
    let iya2 = 0;

    const snapshot = await getDocs(collection(db, "supporters"));

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.ward === "Tudun Kofa Ward") tudun++;
      if (data.ward === "Gangaren Tudu Ward") gangaren++;
      if (data.ward === "Yara Ward") yara++;
      if (data.ward === "Iya 1 Ward") iya1++;
      if (data.ward === "Iya 2 Ward") iya2++;

      const text = (
        (data.name || "") +
        (data.phone || "") +
        (data.ward || "")
      ).toLowerCase();

      if (!text.includes(search.toLowerCase())) return;

      table.innerHTML += `
        <tr>
          <td>${data.name || ""}</td>
          <td>${data.phone || ""}</td>
          <td>${data.ward || ""}</td>
          <td>${data.pollingUnit || ""}</td>
          <td>${data.gender || ""}</td>
          <td>${data.occupation || ""}</td>
        </tr>
      `;
    });

    document.getElementById("tudunKofa").textContent = tudun;
    document.getElementById("gangarenTudu").textContent = gangaren;
    document.getElementById("yara").textContent = yara;
    document.getElementById("iya1").textContent = iya1;
    document.getElementById("iya2").textContent = iya2;

  } catch (error) {
    console.error(error);
    alert("Error loading supporters: " + error.message);
  }
}

loadSupporters();

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  loadSupporters(e.target.value);
});

document.getElementById("exportBtn").addEventListener("click", async () => {
  const snapshot = await getDocs(collection(db, "supporters"));

  let csv = "Name,Phone,Ward,Polling Unit,Gender,Occupation\n";

  snapshot.forEach((doc) => {
    const data = doc.data();

    csv += `"${data.name || ""}","${data.phone || ""}","${data.ward || ""}","${data.pollingUnit || ""}","${data.gender || ""}","${data.occupation || ""}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "KeffiWestSupporters.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});