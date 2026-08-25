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

window.addEventListener("load", function () {

    new QRCode(document.getElementById("qrcode"), {
        text: upiLink,
        width: 235,
        height: 235,
        correctLevel: QRCode.CorrectLevel.H
    });

});


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
