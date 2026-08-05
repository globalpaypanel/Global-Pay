const fill = document.getElementById("fill");
const status = document.getElementById("status");
const title = document.getElementById("title");
const sub = document.getElementById("sub");

let progress = 0;

const messages = [
"Initializing secure connection...",
"Encrypting account details...",
"Validating account information...",
"Connecting to secure server...",
"Creating running account...",
"Verification completed successfully..."
];

let msg = 0;

const loading = setInterval(() => {

progress += 1;

fill.style.width = progress + "%";

if(progress % 16 === 0 && msg < messages.length){
status.innerHTML = messages[msg];
msg++;
}

if(progress >= 100){

clearInterval(loading);

title.innerHTML = "✔ Verification Successful";

sub.innerHTML = "Your running account is ready.";

status.innerHTML = "Redirecting...";

setTimeout(()=>{

window.location.href = "runningaccount.html";

},2500);

}

},120);
