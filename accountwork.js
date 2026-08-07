// ==============================
// GLOBAL PAY ENGINE
// ==============================

let engineRunning = false;

let gamingFund = 0;
let commission = 0;
let totalCredit = 0;

const commissionRate = 0.05;

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

// Credit Name List
const names = [
"Rahul Kumar",
"Amit Singh",
"Rohit Sharma",
"Ankit Kumar",
"Vikas Yadav",
"Sachin Gupta",
"Pooja Kumari",
"Neha Sharma",
"Priya Singh",
"Riya Kumari",
"Kajal Devi",
"Sneha Verma",
"Deepak Kumar",
"Ajay Kumar",
"Abhishek Singh",
"Manish Kumar",
"Sonu Kumar",
"Arjun Singh",
"Rakesh Yadav",
"Nisha Kumari"
];

// Bank List
const banks = [
{
name:"State Bank of India",
ifsc:"SBIN0004582"
},
{
name:"HDFC Bank",
ifsc:"HDFC0002123"
},
{
name:"ICICI Bank",
ifsc:"ICIC0004422"
},
{
name:"Axis Bank",
ifsc:"UTIB0008877"
},
{
name:"Punjab National Bank",
ifsc:"PUNB003245"
},
{
name:"Bank of Baroda",
ifsc:"BARB0INDIA"
},
{
name:"Canara Bank",
ifsc:"CNRB0004455"
},
{
name:"Union Bank",
ifsc:"UBIN055221"
},
{
name:"Indian Bank",
ifsc:"IDIB0007744"
},
{
name:"IDFC FIRST Bank",
ifsc:"IDFB008811"
}
];

function randomItem(arr){
return arr[Math.floor(Math.random()*arr.length)];
}

function randomLast4(){
return Math.floor(
1000 + Math.random()*9000
);
}

function formatMoney(x){
return "₹"+x.toLocaleString("en-IN");
}


// ==============================
// START ENGINE
// ==============================

const activeBtn = document.getElementById("activeBtn");
const transactionList = document.getElementById("transactionList");

activeBtn.onclick = function(){

if(engineRunning) return;

engineRunning = true;

activeBtn.innerHTML = "🟢 RUNNING";
activeBtn.disabled = true;

startTransactions();

};

function startTransactions(){

createCredit();

}

function createCredit(){

if(totalCredit>=500000){

stopEngine();

return;

}

let amount = randomItem(amounts);

let person = randomItem(names);

let bank = randomItem(banks);

let last4 = randomLast4();

let now = new Date();

let date = now.toLocaleDateString("en-IN");

let time = now.toLocaleTimeString("en-IN");

gamingFund += amount;

commission += Math.floor(amount*commissionRate);

totalCredit += amount;

document.getElementById("gamingFund").innerHTML =
formatMoney(gamingFund);

document.getElementById("commission").innerHTML =
formatMoney(commission);

transactionList.insertAdjacentHTML("afterbegin",`

<div class="transactionCard creditCard">

<div class="leftInfo">

<h3>🟢 CREDIT</h3>

<p>${person}</p>

<p>${bank.name}</p>

<p>XXXX${last4}</p>

<p>${bank.ifsc}</p>

</div>

<div class="rightInfo">

<div class="amountCredit">
+ ${formatMoney(amount)}
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
