const UPI_ID = "8271692042-2@ybl";
const AMOUNT = "2500";
const PAYEE_NAME = "Global Pay";

const upiLink =
    "upi://pay" +
    "?pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent(PAYEE_NAME) +
    "&am=" + AMOUNT +
    "&cu=INR";


/* QR CODE */

window.addEventListener("load", function () {

    new QRCode(document.getElementById("qrcode"), {
        text: upiLink,
        width: 230,
        height: 230,
        correctLevel: QRCode.CorrectLevel.H
    });

});


/* COPY UPI */

function copyUPI() {

    navigator.clipboard.writeText(UPI_ID)
        .then(function () {

            alert("UPI ID copied");

        })
        .catch(function () {

            alert("UPI ID: " + UPI_ID);

        });
}


/* PAYMENT */

function payWith(app) {

    if (app === "phonepe") {

        window.location.href =
            "phonepe://pay?pa=" +
            encodeURIComponent(UPI_ID) +
            "&pn=" +
            encodeURIComponent(PAYEE_NAME) +
            "&am=" +
            AMOUNT +
            "&cu=INR";

    }

    else if (app === "gpay") {

        window.location.href =
            "tez://upi/pay?pa=" +
            encodeURIComponent(UPI_ID) +
            "&pn=" +
            encodeURIComponent(PAYEE_NAME) +
            "&am=" +
            AMOUNT +
            "&cu=INR";

    }

    else if (app === "paytm") {

        window.location.href =
            "paytmmp://pay?pa=" +
            encodeURIComponent(UPI_ID) +
            "&pn=" +
            encodeURIComponent(PAYEE_NAME) +
            "&am=" +
            AMOUNT +
            "&cu=INR";

    }

          }
