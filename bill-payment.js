let selectedOperator = "";
let selectedPlan = null;


/* DEMO PLAN DATA */

const plans = {

    Airtel: [
        ["28 Days", "199", "119"],
        ["56 Days", "399", "239"],
        ["84 Days", "649", "389"],
        ["180 Days", "1799", "1079"],
        ["365 Days", "3599", "2159"]
    ],

    Jio: [
        ["28 Days", "199", "119"],
        ["56 Days", "349", "209"],
        ["84 Days", "599", "359"],
        ["180 Days", "1499", "899"],
        ["365 Days", "3599", "2159"]
    ],

    Vi: [
        ["28 Days", "199", "119"],
        ["56 Days", "365", "219"],
        ["84 Days", "649", "389"],
        ["180 Days", "1799", "1079"],
        ["365 Days", "3699", "2219"]
    ],

    BSNL: [
        ["28 Days", "199", "119"],
        ["56 Days", "397", "238"],
        ["84 Days", "599", "359"],
        ["180 Days", "1499", "899"],
        ["365 Days", "2399", "1439"]
    ],

    MTNL: [
        ["28 Days", "199", "119"],
        ["56 Days", "399", "239"],
        ["84 Days", "599", "359"],
        ["180 Days", "1499", "899"],
        ["365 Days", "2399", "1439"]
    ]

};


/* SELECT OPERATOR */

function selectOperator(element, operator){

    document
        .querySelectorAll(".operators button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    element.classList.add("selected");

    selectedOperator = operator;
    selectedPlan = null;

    showPlans(operator);
}


/* SHOW PLANS */

function showPlans(operator){

    const container =
        document.getElementById("plans");

    container.innerHTML = "";

    plans[operator].forEach(function(plan){

        const validity = plan[0];
        const original = Number(plan[1]);
        const discounted = Number(plan[2]);

        const card = document.createElement("button");

        card.className = "plan";

        card.onclick = function(){

            document
                .querySelectorAll(".plan")
                .forEach(p => {
                    p.classList.remove("selected");
                });

            card.classList.add("selected");

            selectedPlan = {
                validity: validity,
                original: original,
                amount: discounted
            };

            document
                .getElementById("mobileSection")
                .classList.remove("hidden");

        };

        card.innerHTML = `

            <div class="plan-top">

                <strong>${validity}</strong>

                <span class="discount">
                    40% OFF
                </span>

            </div>

            <div class="price">

                <del>₹${original}</del>

                <b>₹${discounted}</b>

            </div>

            <small>
                Recharge plan
            </small>

        `;

        container.appendChild(card);

    });

    document
        .getElementById("plansSection")
        .classList.remove("hidden");

    document
        .getElementById("mobileSection")
        .classList.add("hidden");
}


/* START SCAN ANIMATION */

function startScanAnimation(){

    const mobile =
        document.getElementById("mobile").value.trim();

    if(!selectedPlan){

        showNoticeMessage(
            "Select Plan",
            "Please select a recharge plan first."
        );

        return;
    }

    if(!/^[0-9]{10}$/.test(mobile)){

        showNoticeMessage(
            "Invalid Mobile Number",
            "Please enter a valid 10 digit mobile number."
        );

        return;
    }

    document
        .getElementById("mobileSection")
        .classList.add("hidden");

    document
        .getElementById("scanSection")
        .classList.remove("hidden");

    window.scrollTo({
        top:document.body.scrollHeight,
        behavior:"smooth"
    });


    setTimeout(function(){

        document
            .getElementById("scanSection")
            .classList.add("hidden");

        generateQR();

    },3500);
}


/* GENERATE QR */

function generateQR(){

    const mobile =
        document.getElementById("mobile").value.trim();

    document.getElementById("summaryOperator")
        .innerText = selectedOperator;

    document.getElementById("summaryMobile")
        .innerText = "+91 " + mobile;

    document.getElementById("summaryPlan")
        .innerText = selectedPlan.validity;

    document.getElementById("summaryAmount")
        .innerText = "₹" + selectedPlan.amount;


    const qr =
        document.getElementById("qrcode");

    qr.innerHTML = "";


    /*
      DEMO QR DATA

      Real payment ke liye yahan
      actual payment gateway/order QR
      connect karna hoga.
    */

    const demoData =
        "GLOBALPAY-DEMO|" +
        selectedOperator + "|" +
        mobile + "|" +
        selectedPlan.amount;


    new QRCode(qr,{

        text:demoData,

        width:210,
        height:210,

        colorDark:"#111",
        colorLight:"#fff",

        correctLevel:
            QRCode.CorrectLevel.H

    });


    document
        .getElementById("qrSection")
        .classList.remove("hidden");

    window.scrollTo({
        top:document.body.scrollHeight,
        behavior:"smooth"
    });
}


/* UTR VALIDATION */

function validateUTR(){

    const input =
        document.getElementById("utr");

    const error =
        document.getElementById("utrError");

    const value =
        input.value.trim();


    if(value.length === 0){

        input.classList.remove("valid");
        input.classList.remove("invalid");

        error.innerText = "";

        return false;
    }


    if(value.length < 12){

        input.classList.add("invalid");
        input.classList.remove("valid");

        error.innerText =
            "UTR must contain at least 12 characters.";

        return false;
    }


    if(value.length > 16){

        input.classList.add("invalid");
        input.classList.remove("valid");

        error.innerText =
            "UTR cannot contain more than 16 characters.";

        return false;
    }


    input.classList.add("valid");
    input.classList.remove("invalid");

    error.innerText = "";

    return true;
}


/* VERIFY */

function verifyPayment(){

    const utr =
        document.getElementById("utr")
            .value
            .trim();


    if(!validateUTR()){

        return;
    }


    /*
      SAFE DEMO TEST UTR

      Real UTR verification ke liye backend/payment
      gateway verification required hai.
    */

    if(utr === "DEMO123456789"){

        document
            .getElementById("notice")
            .classList.remove("hidden");

        return;
    }


    showNoticeMessage(
        "Payment Verification Failed",
        "This demo UTR could not be verified. Please use the designated demo UTR."
    );
}


/* DEMO NOTICE */

function showNoticeMessage(title, message){

    const notice =
        document.getElementById("notice");

    notice
        .querySelector("h2")
        .innerText = title;

    notice
        .querySelector("p")
        .innerText = message;

    notice
        .querySelector(".success-icon")
        .innerText = "!";

    notice.classList.remove("hidden");
}


/* CLOSE NOTICE */

function closeNotice(){

    document
        .getElementById("notice")
        .classList.add("hidden");

}
