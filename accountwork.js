// =============================
// GLOBAL PAY ENGINE v2
// =============================

// ---------- LOAD ACCOUNT DETAILS ----------

const holderName = localStorage.getItem("holderName") || "Account Holder";
const bankName = localStorage.getItem("bankName") || "Bank";
const accountNumber = localStorage.getItem("accountNumber") || "0000";
const ifscCode = localStorage.getItem("ifsc") || "IFSC";

document.getElementById("holderName").innerText = holderName;
document.getElementById("bankName").innerText = bankName;

const last4 = accountNumber.slice(-4);

document.getElementById("accountNumber").innerText =
"XXXX XXXX " + last4;

document.getElementById("ifscCode").innerText = ifscCode;


// ---------- MAIN VARIABLES ----------

const activeBtn = document.getElementById("activeBtn");

const transactionList =
document.getElementById("transactionList");

const gamingFundBox =
document.getElementById("gamingFund");

const commissionBox =
document.getElementById("commission");

const popup =
document.getElementById("limitPopup");

const popupBtn =
document.getElementById("limitOk");


let running = false;

let gamingFund = 0;

let commission = 0;

let totalCredit = 0;

const LIMIT = 500000;


// ---------- RANDOM AMOUNTS ----------

const amounts = [

500,

999,

1000,

1499,

2000,

2500,

3000,

4000,

5000

];

function randomAmount(){

return amounts[
Math.floor(Math.random()*amounts.length)
];

  }


// ============================
// RANDOM CREDIT DATA
// ============================

const names=[

"Rahul Kumar","Rohit Sharma","Amit Singh","Ajay Kumar","Abhishek Raj",
"Ankit Verma","Vikas Gupta","Sanjay Patel","Rakesh Yadav","Deepak Kumar",
"Sonu Kumar","Karan Singh","Aakash Verma","Aman Raj","Pankaj Kumar",
"Rajesh Singh","Mukesh Kumar","Ashok Patel","Vinod Sharma","Shivam Raj",
"Priya Singh","Neha Kumari","Pooja Sharma","Rani Kumari","Anjali Verma",
"Muskan Kumari","Sneha Gupta","Kajal Singh","Nisha Patel","Komal Raj",
"Payal Kumari","Suman Devi","Sapna Kumari","Rekha Devi","Ritu Singh",
"Anu Kumari","Aarti Verma","Khushi Raj","Sakshi Singh","Preeti Sharma",
"Nitin Kumar","Mohit Raj","Ravi Kumar","Anurag Singh","Shubham Kumar",
"Akash Kumar","Vivek Raj","Harsh Gupta","Nikhil Sharma","Prakash Singh",
"Suraj Kumar","Rohit Raj","Aman Gupta","Ritesh Kumar","Manoj Singh",
"Dilip Kumar","Anmol Raj","Kundan Kumar","Saurabh Singh","Golu Kumar"

];

const banks=[

"State Bank of India",
"HDFC Bank",
"ICICI Bank",
"Axis Bank",
"Punjab National Bank",
"Bank of Baroda",
"Canara Bank",
"Indian Bank",
"Union Bank",
"IDFC FIRST Bank",
"Kotak Mahindra Bank",
"Yes Bank",
"Bank of India",
"Central Bank of India",
"Federal Bank",
"South Indian Bank",
"RBL Bank",
"AU Small Finance Bank",
"IndusInd Bank",
"UCO Bank"

];

const ifscPrefix=[

"SBIN",
"HDFC",
"ICIC",
"UTIB",
"PUNB",
"BARB",
"CNRB",
"IDIB",
"UBIN",
"IDFB",
"KKBK",
"YESB"

];

function randomName(){

return names[Math.floor(Math.random()*names.length)];

}

function randomBank(){

return banks[Math.floor(Math.random()*banks.length)];

}

function randomIFSC(){

return ifscPrefix[Math.floor(Math.random()*ifscPrefix.length)]

+

Math.floor(1000000+Math.random()*9000000);

}

function randomAccount(){

return "XXXX XXXX "+

Math.floor(1000+Math.random()*9000);

}

function money(x){

return "₹"+x.toLocaleString("en-IN");

  }


// ===============================
// START ENGINE
// ===============================

activeBtn.onclick=function(){

if(running) return;

running=true;

activeBtn.innerHTML="🟢 RUNNING";

setTimeout(createCredit,10000);

};

function createCredit(){

if(!running) return;

if(totalCredit>=LIMIT){

stopEngine();

return;

}

const amount=randomAmount();

const person=randomName();

const bank=randomBank();

const account=randomAccount();

const ifsc=randomIFSC();

const now=new Date();

const date=now.toLocaleDateString("en-IN");

const time=now.toLocaleTimeString("en-IN");

gamingFund+=amount;

commission+=amount*0.05;

totalCredit+=amount;

gamingFundBox.innerHTML=money(gamingFund);

commissionBox.innerHTML=money(Math.floor(commission));

transactionList.insertAdjacentHTML("afterbegin",`

<div class="transactionCard creditCard">

<div class="leftInfo">

<h3>🟢 CREDIT</h3>

<p>${person}</p>

<p>${bank}</p>

<p>${account}</p>

<p>${ifsc}</p>

</div>

<div class="rightInfo">

<div class="amountCredit">
+ ${money(amount)}
</div>

<div class="timeText">
${date}<br>${time}
</div>

</div>

</div>

`);

setTimeout(function(){

createDebit(amount);

},1500);

  }


// ===============================
// FIXED DEBIT
// ===============================

function createDebit(amount){

const now=new Date();

const date=now.toLocaleDateString("en-IN");

const time=now.toLocaleTimeString("en-IN");

transactionList.insertAdjacentHTML("afterbegin",`

<div class="transactionCard debitCard">

<div class="leftInfo">

<h3>🔴 DEBIT</h3>

<p>BALAJI SUPER MARKET</p>

<p>ICICI Bank</p>

<p>440005003462</p>

<p>ICIC0004400</p>

</div>

<div class="rightInfo">

<div class="amountDebit">
- ${money(amount)}
</div>

<div class="timeText">
${date}<br>${time}
</div>

</div>

</div>

`);

while(transactionList.children.length>50){
transactionList.removeChild(transactionList.lastChild);
}

if(totalCredit>=LIMIT){
stopEngine();
return;
}

const delay=Math.floor(Math.random()*4000)+1000;

setTimeout(createCredit,delay);

}

// ===============================
// LIMIT
// ===============================

function stopEngine(){

running=false;

popup.style.display="flex";

activeBtn.innerHTML="🔴 LIMIT";

activeBtn.disabled=true;

}

popupBtn.onclick=function(){

popup.style.display="none";

};
