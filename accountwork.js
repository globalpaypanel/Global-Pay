// ===== BANK DETAILS =====

const bankName = localStorage.getItem("bankName") || "Not Linked";
const holderName = localStorage.getItem("holderName") || "Not Linked";
const accountNumber = localStorage.getItem("accountNumber") || "";
const ifsc = localStorage.getItem("ifsc") || "Not Linked";

document.getElementById("bankName").innerHTML = bankName;
document.getElementById("holderName").innerHTML = holderName;
document.getElementById("ifsc").innerHTML = ifsc;

if(accountNumber.length>=4){

document.getElementById("accountNo").innerHTML =
"XXXX XXXX " + accountNumber.slice(-4);

}else{

document.getElementById("accountNo").innerHTML =
"XXXX XXXX 0000";

}


// ===== VARIABLES =====

let gamingFund = 0;

let commission = 0;

let totalTransaction = 0;

let transactionRunning = true;


// Fixed Amount List

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


// Random Indian Names

const names = [

"Rahul Kumar",
"Amit Singh",
"Rohit Sharma",
"Vikas Gupta",
"Deepak Kumar",
"Ajay Singh",
"Abhishek Raj",
"Pawan Kumar",
"Rakesh Yadav",
"Ankit Verma",
"Neeraj Singh",
"Saurabh Kumar",
"Shivam Raj",
"Vivek Gupta",
"Mohit Kumar"

];


// Banks

const banks = [

"State Bank of India",
"Punjab National Bank",
"ICICI Bank",
"HDFC Bank",
"Axis Bank",
"Bank of Baroda"

];


// ===== CREATE TRANSACTION =====

function createTransaction(){

if(!transactionRunning) return;

const amount = amounts[Math.floor(Math.random()*amounts.length)];

const isCredit = Math.random()>0.45;

const person = names[Math.floor(Math.random()*names.length)];

const bank = banks[Math.floor(Math.random()*banks.length)];

const now = new Date();

const time = now.toLocaleString("en-IN");

const last4 =
accountNumber.length>=4
? accountNumber.slice(-4)
: "0000";

const card=document.createElement("div");

card.className="transactionCard";

if(isCredit){

gamingFund += amount;

commission += Math.floor(amount*0.05);

totalTransaction += amount;

card.innerHTML=`
<div style="color:#00ff88;font-size:22px;font-weight:bold;">
+ ₹${amount.toLocaleString("en-IN")}
</div>

<div style="margin-top:8px;">
👤 ${person}
</div>

<div>
🏦 ${bank}
</div>

<div>
💳 XXXX ${last4}
</div>

<div>
🕒 ${time}
</div>

`;

}else{

gamingFund -= amount;

if(gamingFund<0) gamingFund=0;

totalTransaction += amount;

card.innerHTML=`
<div style="color:#ff4d4d;font-size:22px;font-weight:bold;">
- ₹${amount.toLocaleString("en-IN")}
</div>

<div style="margin-top:8px;">
👤 ${person}
</div>

<div>
🏦 ${bank}
</div>

<div>
💳 XXXX ${last4}
</div>

<div>
🕒 ${time}
</div>

`;

}

document.getElementById("gamingFund").innerHTML=
"₹"+gamingFund.toLocaleString("en-IN");

document.getElementById("commission").innerHTML=
"₹"+commission.toLocaleString("en-IN");

const list=document.getElementById("transactionList");

list.prepend(card);

if(list.children.length>25){

list.removeChild(list.lastChild);

}

}
