document.addEventListener("DOMContentLoaded", function(){

    const codeInput = document.getElementById("activationCode");
    const verifyBtn = document.getElementById("verifyBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const message = document.getElementById("message");
    const card = document.querySelector(".activation-card");

    const ACTIVATION_CODE = "96619300";

    verifyBtn.addEventListener("click", function(){

        const code = codeInput.value.trim();

        if(code === ""){

            message.style.color = "#ff4d4d";
            message.textContent = "⚠️ Enter Activation Code";

            codeInput.focus();

            return;
        }

        if(code === ACTIVATION_CODE){

            message.style.color = "#00ff88";
            message.textContent = "✅ Verification Successful";

            card.classList.remove("success");
            void card.offsetWidth;
            card.classList.add("success");

            verifyBtn.disabled = true;

            setTimeout(function(){

                window.location.href = "check-statusshow.html";

            },800);

        }else{

            message.style.color = "#ff4d4d";
            message.textContent = "❌ Invalid Activation Code";

            card.classList.remove("shake");
            void card.offsetWidth;
            card.classList.add("shake");

            codeInput.value = "";
            codeInput.focus();

        }

    });

    cancelBtn.addEventListener("click", function(){

        window.location.href = "status.html";

    });

    codeInput.addEventListener("keydown", function(event){

        if(event.key === "Enter"){

            verifyBtn.click();

        }

    });

});
