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
    document.getElementById("accountError").style.color = "#00ff88";
    document.getElementById("accountError").innerHTML = "✅ Security Verified";

    setTimeout(() => {
      window.location.href = "accountwork.html";
    }, 900);

  } else {
    document.getElementById("accountError").style.color = "#ff3b3b";
    document.getElementById("accountError").innerHTML = "❌ Invalid Activation Code";
  }
}
