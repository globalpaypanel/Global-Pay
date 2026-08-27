const UPI_ID = "8271692042-2@ybl";
const AMOUNT = "2500";
const PAYEE_NAME = "Global Pay";

const upiLink =
    "upi://pay" +
    "?pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent(PAYEE_NAME) +
    "&am=" + AMOUNT +
    "&cu=INR";


/* CREATE QR */




/* COPY UPI ID */

function copyUPI() {

    navigator.clipboard.writeText(UPI_ID)
        .then(function () {

            showCopySuccess();

        })
        .catch(function () {

            // Fallback
            const textarea = document.createElement("textarea");
            textarea.value = UPI_ID;

            document.body.appendChild(textarea);
            textarea.select();

            document.execCommand("copy");
            textarea.remove();

            showCopySuccess();
        });
}


function showCopySuccess() {

    const toast = document.getElementById("copyToast");

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}


/* PAYMENT BUTTON */

function payWith(app) {

    let paymentUrl = "";

    if (app === "phonepe") {

        paymentUrl =
            "phonepe://pay" +
            "?pa=" + encodeURIComponent(UPI_ID) +
            "&pn=" + encodeURIComponent(PAYEE_NAME) +
            "&am=" + AMOUNT +
            "&cu=INR";

    }

    else if (app === "gpay") {

        paymentUrl =
            "tez://upi/pay" +
            "?pa=" + encodeURIComponent(UPI_ID) +
            "&pn=" + encodeURIComponent(PAYEE_NAME) +
            "&am=" + AMOUNT +
            "&cu=INR";

    }

    else if (app === "paytm") {

        paymentUrl =
            "paytmmp://pay" +
            "?pa=" + encodeURIComponent(UPI_ID) +
            "&pn=" + encodeURIComponent(PAYEE_NAME) +
            "&am=" + AMOUNT +
            "&cu=INR";

    }

    window.location.href = paymentUrl;
}



/* ================= UTR VALIDATION ================= */

function validateUTRInput(){

    const input = document.getElementById("utrNumber");
    const count = document.getElementById("utrCount");
    const error = document.getElementById("utrError");
    const box = input.parentElement;

    // Sirf numbers allow
    input.value = input.value.replace(/\D/g, "");

    // Maximum 18 digits
    if(input.value.length > 18){
        input.value = input.value.substring(0, 18);
    }

    count.textContent =
        input.value.length + "/18";

    box.classList.remove("invalid");
    box.classList.remove("valid");

    error.textContent = "";

    if(input.value.length > 0 &&
       input.value.length < 12){

        error.textContent =
            "UTR Number must contain 12–18 digits.";

        box.classList.add("invalid");

    } else if(input.value.length >= 12){

        box.classList.add("valid");
    }
}


function submitUTR(){

    const input =
        document.getElementById("utrNumber");

    const error =
        document.getElementById("utrError");

    const box =
        input.parentElement;

    const utr =
        input.value.trim();

    // Empty
    if(!utr){

        error.textContent =
            "Please enter your UTR Number.";

        box.classList.add("invalid");

        input.focus();

        return;
    }

    // Only digits
    if(!/^\d+$/.test(utr)){

        error.textContent =
            "UTR Number can contain digits only.";

        box.classList.add("invalid");

        return;
    }

    // Length check
    if(utr.length < 12 || utr.length > 18){

        error.textContent =
            "Invalid UTR Number. Enter 12–18 digits.";

        box.classList.add("invalid");

        return;
    }

    /*
       Yahan actual payment verification API/backend
       se UTR verify karna chahiye.

       Abhi sirf submission state dikhayi ja rahi hai.
    */

    error.style.color = "#00df9a";

    error.textContent =
        "UTR submitted. Payment verification in progress.";

    box.classList.remove("invalid");
    box.classList.add("valid");

}
