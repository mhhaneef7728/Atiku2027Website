<script src="badge.js"></script>
// Load supporter information
const saved = localStorage.getItem("supporter");

if (saved) {
    const supporter = JSON.parse(saved);

    document.getElementById("fullname").textContent = supporter.name || "";
    document.getElementById("ward").textContent = supporter.ward || "";
    document.getElementById("polling").textContent = supporter.pollingUnit || "";

    if (supporter.photo) {
        document.getElementById("supporter").src = supporter.photo;
    } else {
        document.getElementById("supporter").src = "default-user.png";
    }
} else {
    alert("No supporter data found.");
    window.location.href = "index.html";
}

// Download Badge
function downloadBadge() {
    const badge = document.getElementById("badge");

    html2canvas(badge, {
        useCORS: true,
        backgroundColor: null,
        scale: 2
    }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "Atiku2027-Supporter-Badge.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}