document.addEventListener("DOMContentLoaded", function(){

    const mobileNumber =
        document.getElementById("mobileNumber");

    const status =
        document.getElementById("status");

    const seconds =
        document.getElementById("seconds");

    const progressBar =
        document.getElementById("progressBar");

    const successBox =
        document.getElementById("successBox");

    const cancelBtn =
        document.getElementById("cancelBtn");

    const otpBoxes = [
        document.getElementById("otp1"),
        document.getElementById("otp2"),
        document.getElementById("otp3"),
        document.getElementById("otp4"),
        document.getElementById("otp5"),
        document.getElementById("otp6")
    ];


    /* Registered mobile number */

    const phone =
        localStorage.getItem("phone") || "";

    const cleanPhone =
        phone.replace(/\D/g,"");

    if(cleanPhone.length === 10){

        mobileNumber.textContent =
            "+91 " + cleanPhone;

    }else if(cleanPhone.length > 0){

        mobileNumber.textContent =
            "+" + cleanPhone;

    }else{

        mobileNumber.textContent =
            "Registered Mobile Number";
    }


    /*
     * DEMO OTP
     *
     * Real SMS OTP automatically read/send
     * nahi ho raha hai.
     *
     * Ye sirf UI simulation hai.
     */

    const demoOTP = "482731";

    let timeLeft = 45;

    let completed = false;


    /* 45-second countdown */

    const timer = setInterval(function(){

        if(completed){

            clearInterval(timer);
            return;
        }

        timeLeft--;

        seconds.textContent =
            timeLeft;

        const progress =
            ((45 - timeLeft) / 45) * 100;

        progressBar.style.width =
            progress + "%";


        if(timeLeft <= 0){

            clearInterval(timer);

            status.textContent =
                "Verification session expired.";

            status.style.color =
                "#ff5252";

        }

    },1000);


    /*
     * DEMO OTP AUTOMATIC FILL
     *
     * 12 seconds ke baad OTP automatically
     * screen par appear hoga.
     */

    setTimeout(function(){

        if(completed || timeLeft <= 0){
            return;
        }

        status.textContent =
            "Secure OTP received. Verifying...";

        status.style.color =
            "#9b5cff";


        let index = 0;

        const fillTimer =
            setInterval(function(){

                if(index >= demoOTP.length){

                    clearInterval(fillTimer);

                    setTimeout(
                        verificationSuccess,
                        700
                    );

                    return;
                }


                otpBoxes[index].textContent =
                    demoOTP[index];

                otpBoxes[index].classList.add(
                    "filled"
                );

                index++;

            },180);

    },12000);


    /*
     * Verification successful
     */

    function verificationSuccess(){

        if(completed){
            return;
        }

        completed = true;

        clearInterval(timer);

        progressBar.style.width =
            "100%";

        seconds.textContent =
            "0";

        status.textContent =
            "✓ Verification Successful";

        status.style.color =
            "#00ff9d";

        successBox.style.display =
            "block";


        localStorage.setItem(
            "mobileVerified",
            "true"
        );


        /*
         * 6 seconds tak success animation
         * dikhane ke baad next page.
         */

        setTimeout(function(){

            /*
             * Yahan apna actual next page
             * rakh sakte ho.
             */

            window.location.href =
                "accountwork.html";

        },6000);

    }


    /*
     * Cancel button
     */

    cancelBtn.addEventListener(
        "click",
        function(){

            if(history.length > 1){

                history.back();

            }else{

                window.location.href =
                    "home.html";

            }

        }
    );

});
