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
