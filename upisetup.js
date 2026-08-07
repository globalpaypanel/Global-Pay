const continueBtn = document.getElementById("continueBtn");

continueBtn.onclick = function () {

const holder = document.getElementById("holderName").value.trim();

const bank = document.getElementById("bankName").value.trim();

const mobile = document.getElementById("mobileNumber").value.trim();

const upi = document.getElementById("upiId").value.trim();

const error = document.getElementById("errorMsg");

if(holder===""){

error.innerHTML="Enter Holder Name";

return;

}

if(bank===""){

error.innerHTML="Enter Bank Name";

return;

}

if(mobile.length!=10){

error.innerHTML="Enter Valid Mobile Number";

return;

}

if(upi===""){

error.innerHTML="Enter UPI ID";

return;

}

localStorage.setItem("holderName",holder);

localStorage.setItem("bankName",bank);

localStorage.setItem("mobileNumber",mobile);

localStorage.setItem("upiId",upi);

error.style.color="#00ff88";

error.innerHTML="UPI Details Saved Successfully...";

setTimeout(function(){

window.location.href="otpverify.html";

},1200);

};
