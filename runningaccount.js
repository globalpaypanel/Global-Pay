// Load user details
document.getElementById("holderName").innerHTML =
localStorage.getItem("holderName") || "Account Holder";

document.getElementById("bankName").innerHTML =
localStorage.getItem("bankName") || "Bank Name";

document.getElementById("cardBank").innerHTML =
localStorage.getItem("bankName") || "BANK";

document.getElementById("cardNumber").innerHTML =
localStorage.getItem("cardNumber") || "0000 0000 0000 0000";

document.getElementById("expiry").innerHTML =
localStorage.getItem("expiry") || "00/00";

document.getElementById("phone").innerHTML =
"+91 " + (localStorage.getItem("phone") || "XXXXXXXXXX");

// Live Date & Time
function updateTime() {
    const now = new Date();

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    document.getElementById("time").innerHTML =
        now.toLocaleString("en-IN", options);
}

updateTime();
setInterval(updateTime, 1000);

// Page Animation
const container = document.querySelector(".container");

container.style.opacity = "0";
container.style.transform = "translateY(40px) scale(.96)";

setTimeout(() => {
    container.style.transition = "1s";
    container.style.opacity = "1";
    container.style.transform = "translateY(0) scale(1)";
}, 200);

// 3D Card Animation
const card = document.querySelector(".card3d");

setInterval(() => {

    card.style.transform = "rotateY(6deg) rotateX(2deg)";

    setTimeout(() => {

        card.style.transform = "rotateY(0deg) rotateX(0deg)";

    }, 1200);

}, 3000);

// Balance Counter Animation
let value = 0;
const target = 8.31;

const counter = setInterval(() => {

    if (value >= target) {
        clearInterval(counter);
    }

document.getElementById("balance").innerHTML = "8.31"; 

    value += 0.25;

}, 15);
