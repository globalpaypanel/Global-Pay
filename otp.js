const phone = localStorage.getItem("phone") || "XXXXXXXXXX";
document.getElementById("phoneNumber").innerHTML = "+91 " + phone;

const inputs = [
document.getElementById("b1"),
document.getElementById("b2"),
document.getElementById("b3"),
document.getElementById("b4"),
document.getElementById("b5"),
document.getElementById("b6")
];

const status = document.getElementById("status");
const count = document.getElementById("count");
const bar = document.getElementById("barFill");

const otp = Math.floor(100000 + Math.random() * 900000).toString();

let sec = 30;

const timer = setInterval(() => {

sec--;

count.innerText = sec;

bar.style.width = (sec / 30) * 100 + "%";

if(sec <= 0){
clearInterval(timer);
status.innerHTML = "OTP Expired";
}

},1000);

const fillDelay = 10000 + Math.floor(Math.random()*2000);

setTimeout(()=>{

status.innerHTML = "OTP detected...";

otp.split("").forEach((n,i)=>{

setTimeout(()=>{

inputs[i].value = n;

inputs[i].classList.add("active");

setTimeout(()=>{
inputs[i].classList.remove("active");
},250);

},i*250);

});

setTimeout(()=>{

status.innerHTML = "Verification Successful ✔";

},2200);

setTimeout(()=>{

window.location.href="runningaccount.html";

},3500);

},fillDelay);
