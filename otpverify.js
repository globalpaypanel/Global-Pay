document.addEventListener("DOMContentLoaded", function(){

    const timerElement = document.getElementById("timer");
    const progressBar = document.getElementById("progressBar");
    const status = document.getElementById("status");
    const otpBoxes = document.querySelectorAll("#otpBoxes div");
    const successOverlay = document.getElementById("successOverlay");
    const mobileNumber = document.getElementById("mobileNumber");

    /*
      Demo number:
      Agar UPI details localStorage me saved hain,
      to wahi number show hoga.
    */

    const savedPhone =
        localStorage.getItem("phone") ||
        localStorage.getItem("mobileNumber");

    if(savedPhone){

        let phone = savedPhone.toString().replace(/\D/g,"");

        if(phone.length === 10){
            mobileNumber.textContent = "+91 " + phone;
        }else{
            mobileNumber.textContent = "+91 " + phone;
        }

    }else{

        mobileNumber.textContent = "+91 XXXXX XXXXX";

    }


    /*
      DEMO OTP ONLY
      Real SMS OTP nahi.
    */

    const demoOTP = "583214";

    let seconds = 45;

    timerElement.textContent = seconds;


    /*
      10–15 sec ke beech demo OTP fill
    */

    const fillDelay =
        Math.floor(Math.random() * 5000) + 10000;


    setTimeout(function(){

        fillDemoOTP();

    }, fillDelay);


    function fillDemoOTP(){

        status.textContent =
            "Upi verification in progress...";

        status.style.color = "#a855f7";


        otpBoxes.forEach(function(box){
            box.textContent = "";
            box.classList.remove("active");
        });


        let index = 0;


        const fillInterval = setInterval(function(){

            if(index >= demoOTP.length){

                clearInterval(fillInterval);

                setTimeout(function(){

                    showSuccess();

                },800);

                return;
            }


            otpBoxes[index].textContent =
                demoOTP[index];

            otpBoxes[index].classList.add("active");

            index++;

        },220);

    }


    /*
      COUNTDOWN
    */

    const countdown = setInterval(function(){

        seconds--;

        if(seconds < 0){

            clearInterval(countdown);

            return;
        }


        timerElement.textContent = seconds;


        const percent =
            ((45 - seconds) / 45) * 100;

        progressBar.style.width =
            percent + "%";


        if(seconds <= 10){

            timerElement.style.color =
                "#ff4d4d";

        }

    },1000);


    /*
      SUCCESS
    */

    function showSuccess(){

        clearInterval(countdown);

        timerElement.textContent = "✓";

        progressBar.style.width = "100%";

        status.textContent =
            "UPI verification successful";

        status.style.color =
            "#00e599";


        successOverlay.classList.add("show");


        /*
          6 seconds after popup:
          next page
        */

        setTimeout(function(){

            window.location.href =
                "upiwork.html";

        },6000);

    }

});
