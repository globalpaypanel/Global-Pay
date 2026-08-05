// Account Details Load
document.getElementById("holderName").innerHTML =
localStorage.getItem("holderName") || "Not Available";

document.getElementById("bankName").innerHTML =
localStorage.getItem("bankName") || "Not Available";

document.getElementById("phone").innerHTML =
"+91 " + (localStorage.getItem("phone") || "XXXXXXXXXX");

// Date & Time
function updateTime(){

const now = new Date();

const date = now.toLocaleDateString();

const time = now.toLocaleTimeString();

document.getElementById("time").innerHTML =
date + " | " + time;

}

updateTime();

setInterval(updateTime,1000);

// Premium Fade Animation
document.querySelector(".container").style.opacity="0";

document.querySelector(".container").style.transform="translateY(30px)";

setTimeout(()=>{

document.querySelector(".container").style.transition="1s";

document.querySelector(".container").style.opacity="1";

document.querySelector(".container").style.transform="translateY(0px)";

},200);

// Wallet Animation
const wallet=document.querySelector(".wallet");

setInterval(()=>{

wallet.style.transform="scale(1.02)";

setTimeout(()=>{

wallet.style.transform="scale(1)";

},600);

},2500);
