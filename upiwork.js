const CREDIT_LIMIT = 100000;
const COMMISSION_RATE = 0.035;

let totalCredit = 0;
let commission = 0;
let transactionCount = 0;

let lastCreditAmount = 0;
let nextCredit = true;

let running = false;
let stoppedByLimit = false;
let timer = null;

const merchantName =
    "BALAJI SUPER MARKET";

const merchantUPI =
    "balaji@icici";


const names = [
    "Vikas Singh","Ankit Kumar","Mohit Kumar",
    "Naveen Kumar","Vishal Kumar","Kunal Singh",
    "Manish Kumar","Rahul Kumar","Amit Singh",
    "Rohit Kumar","Sandeep Kumar","Pankaj Singh",
    "Deepak Kumar","Ravi Kumar","Akash Singh",
    "Abhishek Kumar","Nikhil Kumar","Sumit Singh",
    "Sachin Kumar","Raj Kumar","Arjun Singh",
    "Rakesh Kumar","Gaurav Singh","Shubham Kumar",
    "Prakash Singh","Ajay Kumar","Vivek Singh",
    "Saurabh Kumar"
];


const amounts = [
    100,200,300,400,500,
    600,700,800,900,1000
];


const upiNumbers = [
    "972XXXXX08",
    "827XXXXX42",
    "983XXXXX17",
    "912XXXXX65",
    "998XXXXX31",
    "963XXXXX24",
    "887XXXXX76",
    "901XXXXX19",
    "934XXXXX53",
    "976XXXXX87"
];


const handles = [
    "ybl",
    "axl",
    "oksbi",
    "ibl",
    "upi"
];


function random(arr){

    return arr[
        Math.floor(
            Math.random()*arr.length
        )
    ];
}


function getUPI(){

    return random(upiNumbers)
        + "@"
        + random(handles);
}


function getInitials(name){

    return name
        .split(" ")
        .map(x => x[0])
        .join("")
        .substring(0,2)
        .toUpperCase();
}


/* UPI details saved by setup page */

function loadUPIDetails(){

    const name =
        localStorage.getItem("upiName") ||
        localStorage.getItem("holderName") ||
        "UPI Account";

    const upi =
        localStorage.getItem("upiId") ||
        localStorage.getItem("upi") ||
        "UPI ID not added";

    document.getElementById("upiName")
        .textContent = name;

    document.getElementById("upiId")
        .textContent = upi;
}


/* Dashboard */

function updateDashboard(){

    document.getElementById("credit")
        .textContent =
        "₹" +
        totalCredit.toLocaleString("en-IN");

    document.getElementById("commission")
        .textContent =
        "₹" +
        commission.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits:2,
                maximumFractionDigits:2
            }
        );

    document.getElementById("count")
        .textContent =
        transactionCount;

    const remaining =
        CREDIT_LIMIT-totalCredit;

    document.getElementById("remaining")
        .textContent =
        "₹" +
        Math.max(
            0,
            remaining
        ).toLocaleString("en-IN");

    const progress =
        (totalCredit/CREDIT_LIMIT)*100;

    document.getElementById("progressBar")
        .style.width =
        Math.min(
            100,
            progress
        ) + "%";
}


/* Transaction */

function addTransaction(
    type,
    name,
    upi,
    amount
){

    const list =
        document.getElementById(
            "transactionList"
        );

    const row =
        document.createElement("div");

    const creditType =
        type === "credit";

    row.className =
        "transaction " + type;

    row.innerHTML = `

        <div class="avatar ${
            creditType
            ? "creditAvatar"
            : "debitAvatar"
        }">

            ${
                creditType
                ? getInitials(name)
                : "BS"
            }

        </div>

        <div class="tx-info">

            <div class="tx-name">
                ${name}
            </div>

            <div class="tx-upi">
                ${upi}
            </div>

            <div class="tx-type">
                ${
                    creditType
                    ? "CREDIT"
                    : "DEBIT"
                }
            </div>

        </div>

        <div class="tx-right">

            <div class="tx-amount">

                ${
                    creditType
                    ? "+"
                    : "-"
                }₹${amount.toLocaleString("en-IN")}

            </div>

            <div class="tx-status">
                SIMULATED
            </div>

        </div>
    `;

    list.prepend(row);

    while(list.children.length > 30){

        list.removeChild(
            list.lastElementChild
        );
    }

    document.getElementById("empty")
        .style.display = "none";
}


/* One transaction */

function createTransaction(){

    if(stoppedByLimit){

        stopEngine();

        return;
    }


    /* CREDIT */

    if(nextCredit){

        let amount =
            random(amounts);

        const remaining =
            CREDIT_LIMIT-totalCredit;

        if(amount > remaining){

            amount = remaining;
        }

        if(amount <= 0){

            reachLimit();

            return;
        }


        const name =
            random(names);

        const upi =
            getUPI();


        addTransaction(
            "credit",
            name,
            upi,
            amount
        );


        totalCredit += amount;

        commission +=
            amount*COMMISSION_RATE;

        lastCreditAmount =
            amount;

        transactionCount++;

        nextCredit = false;


        updateDashboard();


        if(
            totalCredit >=
            CREDIT_LIMIT
        ){

            reachLimit();
        }

    }


    /* DEBIT */

    else{

        addTransaction(
            "debit",
            merchantName,
            merchantUPI,
            lastCreditAmount
        );

        /*
          Debit transaction count
          me limit ke liye add nahi hota.
        */

        transactionCount++;

        nextCredit = true;

        updateDashboard();
    }
}


/* Start */

function startEngine(){

    if(stoppedByLimit){

        showLimitPopup();

        return;
    }

    if(running) return;

    running = true;

    document.getElementById(
        "engineStatus"
    ).textContent = "RUNNING";

    document.getElementById(
        "engineStatus"
    ).classList.add("running");

    const btn =
        document.getElementById(
            "startButton"
        );

    btn.textContent = "● RUNNING";

    btn.classList.add("running");


    createTransaction();


    timer =
        setInterval(
            createTransaction,
            2500
        );
}


/* Stop */

function stopEngine(){

    running = false;

    if(timer){

        clearInterval(timer);

        timer = null;
    }

    document.getElementById(
        "engineStatus"
    ).textContent = "STOPPED";

    document.getElementById(
        "engineStatus"
    ).classList.remove("running");

    const btn =
        document.getElementById(
            "startButton"
        );

    btn.textContent = "▶ START";

    btn.classList.remove("running");
}


/* Limit */

function reachLimit(){

    stoppedByLimit = true;

    totalCredit =
        CREDIT_LIMIT;

    stopEngine();

    updateDashboard();

    showLimitPopup();
}


/* Popup */

function showLimitPopup(){

    document.getElementById(
        "limitPopup"
    ).classList.add("show");
}


function closeLimitPopup(){

    document.getElementById(
        "limitPopup"
    ).classList.remove("show");
}


/* Buttons */

document.getElementById(
    "startButton"
).addEventListener(
    "click",
    function(){

        startEngine();

    }
);


document.getElementById(
    "closeLimit"
).addEventListener(
    "click",
    function(){

        closeLimitPopup();

    }
);


document.getElementById(
    "backBtn"
).addEventListener(
    "click",
    function(){

        history.back();

    }
);


/* Load */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        loadUPIDetails();

        updateDashboard();

    }
);
