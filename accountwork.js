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


// ==============================
// FIXED DEBIT
// ==============================

function createDebit(amount){

let now = new Date();

let date = now.toLocaleDateString("en-IN");
let time = now.toLocaleTimeString("en-IN");

transactionList.insertAdjacentHTML("afterbegin",`

<div class="transactionCard debitCard">

<div class="leftInfo">

<h3>🔴 DEBIT</h3>

<p>BALAJI SUPER MARKET</p>

<p>ICICI Bank</p>

<p>XXXX3462</p>

<p>ICIC0004400</p>

</div>

<div class="rightInfo">

<div class="amountDebit">
- ${formatMoney(amount)}
</div>

<div class="timeText">
${date}<br>${time}
</div>

</div>

</div>

`);

if(transactionList.children.length > 50){
transactionList.removeChild(transactionList.lastChild);
}

if(totalCredit >= 500000){

stopEngine();

return;

}

let delay = Math.floor(Math.random()*4000)+1000;

setTimeout(createCredit, delay);

}

// ==============================
// LIMIT SYSTEM
// ==============================

function stopEngine(){

engineRunning = false;

document.getElementById("limitPopup").style.display = "flex";

activeBtn.innerHTML = "🔴 LIMIT";
activeBtn.disabled = true;

}

document.getElementById("limitOk").onclick = function(){

document.getElementById("limitPopup").style.display = "none";

};


// ===============================
// 100+ RANDOM DATA ENGINE
// ===============================

const extraNames = [

"Rahul Kumar","Rohit Sharma","Amit Singh","Ajay Kumar","Abhishek Raj",
"Ankit Verma","Vikas Gupta","Sanjay Patel","Rakesh Yadav","Deepak Kumar",
"Sonu Kumar","Karan Singh","Aakash Verma","Aman Raj","Pankaj Kumar",
"Rajesh Singh","Mukesh Kumar","Ashok Patel","Vinod Sharma","Shivam Raj",
"Priya Singh","Neha Kumari","Pooja Sharma","Rani Kumari","Anjali Verma",
"Muskan Kumari","Sneha Gupta","Kajal Singh","Nisha Patel","Komal Raj",
"Payal Kumari","Suman Devi","Sapna Kumari","Rekha Devi","Ritu Singh",
"Anu Kumari","Aarti Verma","Khushi Raj","Sakshi Singh","Preeti Sharma"

];

const extraBanks = [

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
"UCO Bank",
"Central Bank of India",
"Bank of India",
"Federal Bank",
"South Indian Bank",
"RBL Bank",
"AU Small Finance Bank",
"IndusInd Bank"

];

function generateIFSC(){

const code=[
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

return randomItem(code)+
Math.floor(1000000+Math.random()*9000000);

}

function randomAccount(){

return "XXXX XXXX "+
Math.floor(1000+Math.random()*9000);

  }


// ==============================
// CREDIT ENTRY
// ==============================

function createCredit(){

if(totalCredit>=500000){
stopEngine();
return;
}

let amount=randomItem(amounts);

let person=randomItem(extraNames);

let bank=randomItem(extraBanks);

let last4=Math.floor(1000+Math.random()*9000);

let ifsc=generateIFSC();

let now=new Date();

let date=now.toLocaleDateString("en-IN");

let time=now.toLocaleTimeString("en-IN");

gamingFund+=amount;

commission+=amount*0.05;

totalCredit+=amount;

document.getElementById("gamingFund").innerHTML=
formatMoney(gamingFund);

document.getElementById("commission").innerHTML=
formatMoney(Math.floor(commission));

transactionList.insertAdjacentHTML("afterbegin",`

<div class="transactionCard creditCard">

<div class="leftInfo">

<h3>🟢 CREDIT</h3>

<p>${person}</p>

<p>${bank}</p>

<p>${randomAccount()}</p>

<p>${ifsc}</p>

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


// ==============================
// FIXED DEBIT ENGINE
// ==============================

function createDebit(amount){

let now=new Date();

let date=now.toLocaleDateString("en-IN");

let time=now.toLocaleTimeString("en-IN");

transactionList.insertAdjacentHTML("afterbegin",`

<div class="transactionCard debitCard">

<div class="leftInfo">

<h3>🔴 DEBIT</h3>

<p>BALAJI SUPER MARKET</p>

<p>ICICI Bank</p>

<p>XXXX3462</p>

<p>ICIC0004400</p>

</div>

<div class="rightInfo">

<div class="amountDebit">
- ${formatMoney(amount)}
</div>

<div class="timeText">
${date}<br>${time}
</div>

</div>

</div>

`);

while(transactionList.children.length>40){

transactionList.removeChild(transactionList.lastChild);

}

if(totalCredit>=500000){

stopEngine();

return;

}

let delay=Math.floor(Math.random()*4000)+1000;

setTimeout(createCredit,delay);

}


// ==============================
// ACTIVE BUTTON
// ==============================

activeBtn.onclick=function(){

if(engineRunning)return;

engineRunning=true;

activeBtn.innerHTML="🟢 RUNNING";

activeBtn.style.background="#00c853";

createCredit();

};


// ==============================
// LIMIT SYSTEM
// ==============================

function stopEngine(){

engineRunning=false;

document.getElementById("limitPopup").style.display="flex";

activeBtn.innerHTML="🔴 LIMIT";

activeBtn.disabled=true;

}

document.getElementById("limitOk").onclick=function(){

document.getElementById("limitPopup").style.display="none";

};
