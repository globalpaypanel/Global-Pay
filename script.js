/* ================= PAGE NAVIGATION ================= */

function goTo(page) {
    window.location.href = page;
}


/* ================= THEME ================= */

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "globalPayTheme",
        isLight ? "light" : "dark"
    );
}


/* Load saved theme */

window.addEventListener("DOMContentLoaded", function () {

    const savedTheme =
        localStorage.getItem("globalPayTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

});


/* ================= BALANCE HIDE ================= */

let balanceVisible = true;

function toggleBalance() {

    const balance =
        document.getElementById("balanceAmount");

    if (balanceVisible) {

        balance.textContent = "₹ •••••";

        balanceVisible = false;

    } else {

        balance.textContent = "₹0.00";

        balanceVisible = true;

    }
}


/* ================= SIDE MENU ================= */

function openMenu() {

    alert("Menu will open here.");
}


/* ================= REMOVE BANK ================= */

function showRemovePopup() {

    document
        .getElementById("removePopup")
        .classList.add("show");

}


function closeRemovePopup() {

    document
        .getElementById("removePopup")
        .classList.remove("show");

}


function removeBankDetails() {

    /*
       Yahan apne actual localStorage
       keys add kar sakte ho.
    */

    localStorage.removeItem("bankName");
    localStorage.removeItem("holderName");
    localStorage.removeItem("accountNumber");
    localStorage.removeItem("ifsc");
    localStorage.removeItem("accountType");

    closeRemovePopup();

    alert("Bank details removed successfully.");

}


/* ================= SUPPORT ================= */

function callSupport() {

    window.location.href =
        "tel:9031194209";

}


function whatsappSupport() {

    window.location.href =
        "https://wa.me/918294497070";

}


function emailSupport() {

    window.location.href =
        "mailto:globalpaypannel40cr@gmail.com";

}


function showSupport() {

    alert(
        "For support, please use Call, WhatsApp or Email."
    );

}
