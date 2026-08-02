function login() {

let user = document.getElementById("userid").value.trim();
let pass = document.getElementById("password").value.trim();
let msg = document.getElementById("msg");

if (
    (user === "AJAY@MU2026" && pass === "993428") ||
    (user === "PARAS@7895" && pass === "993428")  ||
    (user === "PULKIT2002" && pass === "993428")  ||
    (user === "Kamlesh@7878" && pass === "993428") ||
    (user === "Ajay@4488" && pass === "480580")
) {

msg.style.color="#00ff88";
msg.innerHTML="✅ Login Successful...";
    localStorage.setItem("userid", user);

setTimeout(function(){
window.location.href = "splash.html";
},1000);

}else{

msg.style.color="#ff4d4d";
msg.innerHTML="❌ Invalid User ID or Password";

}

}
function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const btn = document.querySelector(".top-buttons button");

    if (document.body.classList.contains("light-mode")) {
        btn.innerHTML = "☀️";
    } else {
        btn.innerHTML = "🌙";
    }
}
// Google Login
function googleLogin() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
            }
function toggleMenu(){
    let menu = document.getElementById("popupMenu");

    if(menu.style.display=="block"){
        menu.style.display="none";
    }else{
        menu.style.display="block";
    }
}

window.addEventListener("click", function(event){
    if(!event.target.matches(".menu-btn")){
        let menu = document.getElementById("popupMenu");
        if(menu){
            menu.style.display="none";
        }
    }
});

function savePhoto(){

const file=document.getElementById("photo").files[0];

if(!file){
alert("Please Select Photo");
return;
}

const reader=new FileReader();

reader.onload=function(e){

const currentUser = localStorage.getItem("userid");
localStorage.setItem("profilePhoto_" + currentUser, e.target.result);

alert("Photo Saved Successfully");

window.location.href="profile.html";

}

reader.readAsDataURL(file);

}
