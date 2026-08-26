function login() {

    const user =
        document.getElementById("userid").value.trim();

    const pass =
        document.getElementById("password").value;

    const msg =
        document.getElementById("msg");

    const remember =
        document.getElementById("remember");


    // =========================
    // EMPTY CHECK
    // =========================

    if (!user || !pass) {

        msg.style.color = "#ff4d4d";
        msg.innerHTML =
            "❌ Please enter User ID and Password.";

        return;
    }


    // =========================
    // GET USER DATA
    // =========================

    const savedData =
        localStorage.getItem(
            "globalPayUser_" + user
        );


    if (!savedData) {

        msg.style.color = "#ff4d4d";
        msg.innerHTML =
            "❌ Invalid User ID or Password";

        return;
    }


    const userData =
        JSON.parse(savedData);


    // =========================
    // PASSWORD CHECK
    // =========================

    if (pass !== userData.password) {

        msg.style.color = "#ff4d4d";
        msg.innerHTML =
            "❌ Invalid User ID or Password";

        return;
    }


    // =========================
    // REMEMBER ME
    // =========================

    if (remember && remember.checked) {

        localStorage.setItem(
            "rememberedUser",
            user
        );

    } else {

        localStorage.removeItem(
            "rememberedUser"
        );
    }


    // =========================
    // CURRENT USER
    // =========================

    localStorage.setItem(
        "userid",
        userData.userId
    );


    // =========================
    // LOGIN HISTORY
    // =========================

    const loginKey =
        "globalPayCurrentLogin_" +
        userData.userId;

    const lastLoginKey =
        "globalPayLastLogin_" +
        userData.userId;


    const previousLogin =
        localStorage.getItem(loginKey);


    if (previousLogin) {

        localStorage.setItem(
            lastLoginKey,
            previousLogin
        );
    }


    localStorage.setItem(
        loginKey,
        new Date().toISOString()
    );


    // =========================
    // LOGIN PAGE ACCESS
    // =========================

    localStorage.setItem(
        "allowLoginPage",
        "true"
    );


    // =========================
    // SUCCESS
    // =========================

    msg.style.color = "#00ff88";

    msg.innerHTML =
        "✅ Login Successful...";


    setTimeout(function () {

        window.location.href =
            "splash.html";

    }, 1000);
}



// =========================
// REMEMBERED USER LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const rememberedUser =
            localStorage.getItem(
                "rememberedUser"
            );

        const userInput =
            document.getElementById("userid");

        const remember =
            document.getElementById("remember");


        if (
            rememberedUser &&
            userInput
        ) {

            userInput.value =
                rememberedUser;

            if (remember) {
                remember.checked = true;
            }
        }
    }
);



// =========================
// THEME
// =========================

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    const btn =
        document.querySelector(
            ".top-buttons button"
        );


    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        if (btn) {
            btn.innerHTML = "☀️";
        }

    } else {

        if (btn) {
            btn.innerHTML = "🌙";
        }
    }
}



// =========================
// GOOGLE LOGIN
// =========================

function googleLogin() {

    firebase.auth()
        .signInWithPopup(provider)

        .then((result) => {

            window.location.href =
                "home.html";

        })

        .catch((error) => {

            alert(error.message);

        });
}



// =========================
// LOGOUT
// =========================

function logout() {

    firebase.auth()
        .signOut()

        .then(() => {

            // Current login remove
            localStorage.removeItem(
                "userid"
            );

            localStorage.removeItem(
                "allowLoginPage"
            );

            // Remember Me ko intentionally
            // remove nahi kar rahe
            // taaki checkbox checked rahe

            window.location.href =
                "index.html";

        });
}



// =========================
// MENU
// =========================

function toggleMenu() {

    let menu =
        document.getElementById(
            "popupMenu"
        );


    if (!menu) return;


    if (
        menu.style.display === "block"
    ) {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";
    }
}



window.addEventListener(
    "click",
    function(event) {

        if (
            !event.target.matches(
                ".menu-btn"
            )
        ) {

            let menu =
                document.getElementById(
                    "popupMenu"
                );


            if (menu) {

                menu.style.display =
                    "none";
            }
        }
    }
);



// =========================
// SAVE PHOTO
// =========================

function savePhoto() {

    const photoInput =
        document.getElementById(
            "photo"
        );


    if (!photoInput) return;


    const file =
        photoInput.files[0];


    if (!file) {

        alert(
            "Please Select Photo"
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            const currentUser =
                localStorage.getItem(
                    "userid"
                );


            if (!currentUser) {

                alert(
                    "Please login first."
                );

                return;
            }


            localStorage.setItem(
                "profilePhoto_" +
                currentUser,
                e.target.result
            );


            alert(
                "Photo Saved Successfully"
            );


            window.location.href =
                "profile.html";
        };


    reader.readAsDataURL(file);
        }
