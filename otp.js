const phone = localStorage.getItem("phone") || "XXXXXXXXXX";
document.getElementById("mobile").innerHTML = "+91 " + phone;

const boxes = [
document.getElementById("o1"),
document.getElementById("o2"),
document.getElementById("o3"),
document.getElementById("o4"),
document.getElementById("o5"),
document.getElementById("o6")
];

const status = document.getElementById("status");
const timerText = document.getElementById("time");
const progress = document.getElementById("progress");

// Random OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// 30 sec timer
let seconds = 30;

const timer = setInterval(() => {

seconds--;

timerText.innerText = seconds;

progress.style.width = (seconds / 30) * 100 + "%";

if(seconds <= 0){

clearInterval(timer);

status.innerHTML = "Verification timeout";

}

},1000);

// 10–12 sec random delay
const delay = 10000 + Math.floor(Math.random()*2000);

setTimeout(()=>{

status.innerHTML = "Receiving secure code...";

otp.split("").forEach((digit,index)=>{

setTimeout(()=>{

boxes[index].value = digit;

boxes[index].style.background = "#8b5cf6";
boxes[index].style.transform = "scale(1.08)";

setTimeout(()=>{

boxes[index].style.transform = "scale(1)";
boxes[index].style.background = "#0d1525";

},250);

},index*250);

});

setTimeout(()=>{

status.innerHTML = "✔ Verification Successful";

},2200);

setTimeout(()=>{

window.location.href="runningaccount.html";

},3500);

},delay);
