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

    if (navigator.clipboard) {

        navigator.clipboard.writeText(UPI_ID)
            .then(function () {
                alert("UPI ID copied");
            });

    } else {

        alert("UPI ID: " + UPI_ID);

    }
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
