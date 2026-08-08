const MAX_POOL = 100000;

let remaining = MAX_POOL;
let processed = 0;
let transactionCount = 0;
let engineRunning = false;
let engineTimer = null;

const amounts = [
    100,200,300,400,500,
    600,700,800,900,1000
];

/*
  100+ names
*/

const names = [
"Rahul Kumar","Aman Singh","Rohit Kumar","Vikash Singh",
"Ajay Kumar","Ravi Kumar","Ankit Singh","Arjun Kumar",
"Deepak Kumar","Pankaj Singh","Sandeep Kumar","Manish Kumar",
"Rakesh Singh","Abhishek Kumar","Nitin Kumar","Sumit Singh",
"Vivek Kumar","Kunal Singh","Shubham Kumar","Aditya Singh",
"Akash Kumar","Saurabh Singh","Gaurav Kumar","Mohit Singh",
"Rajan Kumar","Sachin Singh","Prakash Kumar","Ritesh Singh",
"Vishal Kumar","Harsh Singh","Naveen Kumar","Yash Singh",
"Neeraj Kumar","Sanjay Singh","Rohit Singh","Anurag Kumar",
"Mayank Singh","Varun Kumar","Ashish Singh","Karan Kumar",
"Manoj Singh","Piyush Kumar","Rajat Singh","Tushar Kumar",
"Abhinav Singh","Tarun Kumar","Vijay Singh","Dinesh Kumar",
"Ramesh Singh","Mukesh Kumar","Sunil Singh","Rajesh Kumar",
"Anil Singh","Santosh Kumar","Vinay Singh","Manish Singh",
"Ravi Singh","Amit Kumar","Sahil Singh","Nikhil Kumar",
"Pranav Singh","Dev Kumar","Aryan Singh","Rishabh Kumar",
"Yuvraj Singh","Aakash Singh","Rohan Kumar","Varun Singh",
"Rahul Singh","Aman Kumar","Vikas Singh","Rohit Sharma",
"Raj Kumar","Amit Singh","Sumit Kumar","Kunal Kumar",
"Shivam Singh","Abhishek Singh","Saurav Kumar","Vivek Singh",
"Ankit Kumar","Arvind Singh","Kapil Kumar","Gaurav Singh",
"Harshit Kumar","Manish Kumar","Nitesh Singh","Rajat Kumar",
"Deepak Singh","Pankaj Kumar","Sandeep Singh","Rakesh Kumar",
"Vishal Singh","Karan Singh","Sanjay Kumar","Mohit Kumar",
"Akshay Singh","Naveen Singh","Sachin Kumar","Pradeep Singh",
"Ravi Sharma","Aman Sharma","Rahul Sharma","Rohit Verma",
"Ankit Verma","Vikas Kumar","Amit Verma","Shubham Singh",
"Aditya Kumar","Arjun Singh","Akash Singh","Rishi Kumar",
"Devendra Singh","Rajiv Kumar","Suresh Singh","Dilip Kumar"
];

const poolElement = document.getElementById("pool");
const processedElement = document.getElementById("processed");
const remainingElement = document.getElementById("remaining");
const countElement = document.getElementById("count");
const progressBar = document.getElementById("progressBar");
const transactionList = document.getElementById("transactionList");
const empty = document.getElementById("empty");
const engineBtn = document.getElementById("engineBtn");
const engineStatus = document.getElementById("engineStatus");


function randomItem(array){
    return array[Math.floor(Math.random() * array.length)];
}


function randomUPI(name){

    const clean =
        name
        .toLowerCase()
        .replace(/[^a-z]/g,"")
        .slice(0,8);

    const number =
        Math.floor(1000 + Math.random() * 9000);

    return clean + number + "@upi";
}


function initials(name){

    return name
        .split(" ")
        .map(x => x[0])
        .join("")
        .slice(0,2)
        .toUpperCase();

}


function updateStats(){

    poolElement.textContent =
        remaining.toLocaleString("en-IN");

    processedElement.textContent =
        processed.toLocaleString("en-IN");

    remainingElement.textContent =
        remaining.toLocaleString("en-IN");

    countElement.textContent =
        transactionCount.toLocaleString("en-IN");

    const percentage =
        (processed / MAX_POOL) * 100;

    progressBar.style.width =
        percentage + "%";

}


function createTransaction(){

    if(!engineRunning) return;

    if(remaining <= 0){

        stopEngine();

        return;
    }


    let amount = randomItem(amounts);


    /*
      Last transaction ko pool se
      zyada nahi hone dena.
    */

    if(amount > remaining){
        amount = remaining;
    }


    if(amount <= 0){

        stopEngine();

        return;
    }


    const name = randomItem(names);
    const upi = randomUPI(name);


    processed += amount;
    remaining -= amount;
    transactionCount++;


    const row =
    document.createElement("div");

    row.className = "transaction";


    row.innerHTML = `
        <div class="avatar">
            ${initials(name)}
        </div>

        <div class="tx-info">
            <div class="tx-name">
                ${name}
            </div>

            <div class="tx-upi">
                ${upi}
            </div>
        </div>

        <div class="tx-right">
            <div class="tx-amount">
                +₹${amount.toLocaleString("en-IN")}
            </div>

            <div class="tx-status">
                SIMULATED
            </div>
        </div>
    `;


    transactionList.prepend(row);


    /*
      Feed ko manageable rakho
    */

    while(transactionList.children.length > 30){

        transactionList.removeChild(
            transactionList.lastElementChild
        );

    }


    empty.style.display = "none";

    updateStats();


    if(remaining <= 0){

        stopEngine();

    }

}


function startEngine(){

    if(engineRunning) return;

    engineRunning = true;

    engineBtn.textContent = "STOP";

    engineStatus.textContent = "RUNNING";

    engineStatus.classList.add("running");


    /*
      First transaction immediately
    */

    createTransaction();


    /*
      Next transactions random interval
    */

    scheduleNext();

}


function scheduleNext(){

    if(!engineRunning) return;

    const delay =
        Math.floor(Math.random() * 1800) + 1000;


    engineTimer =
        setTimeout(function(){

            createTransaction();

            scheduleNext();

        },delay);

}


function stopEngine(){

    engineRunning = false;

    clearTimeout(engineTimer);

    engineBtn.textContent = "START";

    engineStatus.textContent = "STOPPED";

    engineStatus.classList.remove("running");

}


engineBtn.addEventListener("click",function(){

    if(engineRunning){

        stopEngine();

    }else{

        startEngine();

    }

});


document
.getElementById("backBtn")
.addEventListener("click",function(){

    history.back();

});


updateStats();
