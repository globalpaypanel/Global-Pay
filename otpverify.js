const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const otpInput = document.getElementById("otpInput");
const timer = document.getElementById("timer");
const statusMsg = document.getElementById("statusMsg");

let generatedOTP = "";
let received = false;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP() {
  received = false;
  generatedOTP = generateOTP();

  let seconds = Math.floor(Math.random() * 5) + 8; // 8–12 sec

  timer.innerHTML = "OTP arriving in " + seconds + " sec";

  let countdown = setInterval(() => {
    seconds--;

    if (seconds > 0) {
      timer.innerHTML = "OTP arriving in " + seconds + " sec";
    } else {
      clearInterval(countdown);

      received = true;

      otpInput.value = generatedOTP;

      timer.innerHTML = "OTP Received Successfully ✅";

      statusMsg.style.color = "#00ff88";
      statusMsg.innerHTML = "OTP Auto Verified";

      setTimeout(() => {
        window.location.href = "upiwork.html";
      }, 1500);
    }
  }, 1000);
}

sendOTP();

verifyBtn.onclick = function () {

  if (!received) {
    statusMsg.innerHTML = "Please wait for OTP...";
    return;
  }

  if (otpInput.value === generatedOTP) {
    statusMsg.style.color = "#00ff88";
    statusMsg.innerHTML = "Verification Successful";

    setTimeout(() => {
      window.location.href = "upiwork.html";
    }, 1000);

  } else {
    statusMsg.style.color = "#ff4d4d";
    statusMsg.innerHTML = "Invalid OTP";
  }
};

resendBtn.onclick = function () {
  otpInput.value = "";
  statusMsg.innerHTML = "";
  sendOTP();
};
