const FIX_CODE = "96619300";

const verifyBtn = document.getElementById("verify");
const cancelBtn = document.getElementById("cancel");
const codeBox = document.getElementById("code");
const error = document.getElementById("error");

verifyBtn.onclick = function () {

const code = codeBox.value.trim();

if(code === ""){

error.innerHTML = "Activation Code Required";

return;

}

if(code !== FIX_CODE){

error.innerHTML = "Invalid Activation Code";

codeBox.value="";

return;

}

error.style.color="#00ff88";
error.innerHTML="Verification Successful...";

setTimeout(function(){

window.location.href="upisetup.html";

},1200);

};

cancelBtn.onclick=function(){

window.location.href="home.html";

};

codeBox.addEventListener("keypress",function(e){

if(e.key==="Enter"){

verifyBtn.click();

}

});
