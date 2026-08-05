const fill = document.getElementById("fill");
const status = document.getElementById("status");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

const messages = [
"Establishing Secure Connection...",
"Encrypting Session...",
"Verifying Identity...",
"Connecting Server...",
"Preparing Running Account...",
"Verification Complete ✔"
];

let progress = 0;
let step = 0;

const loading = setInterval(() => {

progress++;

fill.style.width = progress + "%";

if(progress % 18 === 0 && step < messages.length){
status.innerHTML = messages[step];
step++;
}

if(progress >= 100){

clearInterval(loading);

title.style.transform = "scale(1.08)";
title.style.transition = "0.5s";

subtitle.innerHTML = "Welcome to Global Pay";

status.innerHTML = "Opening Running Account...";

document.getElementById("successSound").play();

document.body.style.transition = "1.5s";
document.body.style.background = "#000";

setTimeout(() => {

window.location.href = "runningaccount.html";

},3000);

}

},120);
