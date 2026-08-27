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

function validateUTRInput() {

    const input = document.getElementById("utrNumber");
    const count = document.getElementById("utrCount");
    const error = document.getElementById("utrError");
    const box = document.getElementById("utrBox");

    // Sirf numbers
    input.value = input.value.replace(/\D/g, "");

    // Maximum 18 digits
    if (input.value.length > 18) {
        input.value = input.value.substring(0, 18);
    }

    count.textContent = input.value.length + "/18";

    box.classList.remove("invalid", "valid");
    error.textContent = "";
    error.style.color = "#ff4d68";

    // Empty
    if (input.value.length === 0) {
        return;
    }

    // 12 se kam = invalid/red
    if (input.value.length < 12) {

        box.classList.add("invalid");

        error.textContent =
            "Invalid UTR — enter 12–18 digits.";

        return;
    }

    // 12–18 digits = valid-looking input
    if (input.value.length >= 12 &&
        input.value.length <= 18) {

        box.classList.add("valid");
    }
}


/* ================= CONTINUE ================= */

function submitUTR() {

    const input = document.getElementById("utrNumber");
    const error = document.getElementById("utrError");
    const box = document.getElementById("utrBox");

    const utr = input.value.trim();

    // Empty
    if (!utr) {

        showInvalidUTRPopup();

        box.classList.add("invalid");

        error.textContent =
            "Please enter your UTR Number.";

        return;
    }

    // 12–18 digits required
    if (!/^\d{12,18}$/.test(utr)) {

        showInvalidUTRPopup();

        box.classList.remove("valid");
        box.classList.add("invalid");

        error.textContent =
            "Invalid UTR — enter 12–18 digits.";

        return;
    }

    /*
      IMPORTANT:
      Sirf number ki length dekhkar payment successful
      nahi maana ja sakta. Real payment confirmation ke
      liye backend/payment verification required hai.
    */

    showInvalidUTRPopup();

}


/* ================= INVALID POPUP ================= */

function showInvalidUTRPopup() {

    Swal.fire({

        background: "#07152b",
        color: "#ffffff",

        width: "340px",

        showConfirmButton: true,
        confirmButtonText: "OK",

        confirmButtonColor: "#087cff",

        backdrop: `
            rgba(0,0,0,0.78)
        `,

        html: `
            <div style="
                padding:8px 5px 2px;
                text-align:center;
            ">

                <div style="
                    width:72px;
                    height:72px;
                    margin:0 auto 18px;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:rgba(255,55,85,.12);
                    border:1px solid rgba(255,55,85,.45);
                    box-shadow:0 0 30px rgba(255,55,85,.18);
                ">

                    <span style="
                        font-size:38px;
                        color:#ff405d;
                        font-weight:700;
                    ">×</span>

                </div>

                <div style="
                    font-size:23px;
                    font-weight:800;
                    margin-bottom:8px;
                ">
                    Invalid UTR No.
                </div>

                <div style="
                    color:#91a2bd;
                    font-size:14px;
                    line-height:1.5;
                ">
                    Please enter a valid 12–18 digit
                    UTR number.
                </div>

            </div>
        `

    });
            }
