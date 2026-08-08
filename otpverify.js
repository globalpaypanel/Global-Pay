document.addEventListener("DOMContentLoaded", function(){

    /*
     * UPI Details page me mobile number jis key
     * se save hai, yahan "phone" use kiya gaya hai.
     */

    let phone = localStorage.getItem("phone") || "";

    const mobileNumber =
        document.getElementById("mobileNumber");

    if(phone){

        let clean =
            phone.replace(/\D/g,"");

        if(clean.length === 10){

            mobileNumber.textContent =
                "+91 " + clean;

        }else{

            mobileNumber.textContent =
                "+" + clean;

        }

    }else{

        mobileNumber.textContent =
            "Registered Mobile Number";

    }


    /* OTP INPUTS */

    const otpInputs = [

        document.getElementById("otp1"),
        document.getElementById("otp2"),
        document.getElementById("otp3"),
        document.getElementById("otp4"),
        document.getElementById("otp5"),
        document.getElementById("otp6")

    ];


    const verifyBtn =
        document.getElementById("verifyBtn");

    const cancelBtn =
        document.getElementById("cancelBtn");

    const status =
        document.getElementById("status");

    const seconds =
        document.getElementById("seconds");

    const progressBar =
        document.getElementById("progressBar");

    const successBox =
        document.getElementById("successBox");


    /*
     * DEMO OTP
     *
     * Real SMS OTP nahi hai.
     * Demo testing ke liye:
     * 482731
     */

    const demoOTP = "482731";


    let timeLeft = 45;

    let verified = false;


    /* OTP INPUT BEHAVIOUR */

    otpInputs.forEach(function(input,index){

        input.addEventListener("input",function(){

            input.value =
                input.value.replace(/\D/g,"");

            if(input.value){

                input.classList.add("filled");

                if(index < otpInputs.length - 1){

                    otpInputs[index + 1].focus();

                }

            }

        });


        input.addEventListener("keydown",function(e){

            if(
                e.key === "Backspace" &&
                !input.value &&
                index > 0
            ){

                otpInputs[index - 1].focus();

            }

        });

    });


    /* VERIFY BUTTON */

    verifyBtn.addEventListener("click",function(){

        if(verified){
            return;
        }

        let enteredOTP = "";

        otpInputs.forEach(function(input){

            enteredOTP += input.value;

        });


        if(enteredOTP.length !== 6){

            status.textContent =
                "Please enter the 6-digit OTP.";

            status.style.color =
                "#ff5252";

            return;

        }


        if(enteredOTP === demoOTP){

            verificationSuccess();

        }else{

            status.textContent =
                "❌ Invalid OTP";

            status.style.color =
                "#ff5252";

            otpInputs.forEach(function(input){

                input.style.borderColor =
                    "#ff3b3b";

            });

        }

    });


    /* SUCCESS */

    function verificationSuccess(){

        verified = true;

        status.textContent =
            "✓ Verification Successful";

        status.style.color =
            "#00ff9d";

        successBox.style.display =
            "block";

        verifyBtn.disabled = true;

        verifyBtn.style.opacity =
            ".6";

        localStorage.setItem(
            "mobileVerified",
            "true"
        );

        clearInterval(timer);

    }


    /* CANCEL */

    cancelBtn.addEventListener("click",function(){

        /*
         * Wapas previous page
         */

        if(history.length > 1){

            history.back();

        }else{

            window.location.href =
                "home.html";

        }

    });


    /* TIMER */

    const timer = setInterval(function(){

        if(verified){

            clearInterval(timer);

            return;

        }


        timeLeft--;

        seconds.textContent =
            timeLeft;


        let progress =
            ((45 - timeLeft) / 45) * 100;

        progressBar.style.width =
            progress + "%";


        if(timeLeft <= 0){

            clearInterval(timer);

            status.textContent =
                "Verification session expired.";

            status.style.color =
                "#ff5252";

            verifyBtn.disabled =
                true;

            verifyBtn.style.opacity =
                ".5";

        }

    },1000);


    /*
     * DEMO TESTING:
     *
     * 11 seconds ke baad OTP boxes automatically
     * fill nahi honge. User manually 482731 enter
     * karega.
     *
     * Isse page real OTP screen jaisa behave karega.
     */

});
