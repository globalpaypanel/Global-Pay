function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function showAccountPopup() {
  document.getElementById("accountPopup").style.display = "flex";

  document.getElementById("accountCode").value = "";
  document.getElementById("accountError").innerHTML = "";
}

function closeAccountPopup() {
  document.getElementById("accountPopup").style.display = "none";
}

function checkAccountCode() {

  let code = document.getElementById("accountCode").value.trim();

  if (code === "96619300") {

    document.getElementById("accountError").style.color = "#22c55e";
    document.getElementById("accountError").innerHTML =
      "✅ Security Verified";

    setTimeout(() => {
      window.location.href = "accountwork.html";
    }, 800);

  } else {

    document.getElementById("accountError").style.color = "#ef4444";
    document.getElementById("accountError").innerHTML =
      "❌ Invalid Activation Code";

    const box = document.querySelector(".popupCard");

    box.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 350
      }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("touchstart", function () {
      this.style.transform = "scale(1.02)";
    });

    card.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });

  });

});
