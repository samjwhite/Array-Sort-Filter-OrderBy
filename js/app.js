//Author: Serge Riazanov
//For: ------, technical challenge
//Last Modified: 31 March 2022
//Vanila JS. This is a functional, maintainable, readable, human friendly code. 

//#region ALGORITHMS
//initial data
let inputs = [
    "robin@email.com,15",
    "leo@email.com,31",
    "jack@email.com,31",
    "james@email.com,1",
    "leonid@email.com,31",
    "anna.shmidt@email.com,9",
    "evafzt@email.com,20",
    "mario@email.com,21",
    "kevin@email.com,7",
    "george@email.com,30",
    "brunomars@email.com,21",
    "steven@email.com,9",
    "michael@email.com,0"
];

//Empty arrays declaration
let splitted = [];
let filtered = [];
let output = [];
let dataSource = [];
let filterNumber;

//execute code
processInputs(filterNumber,inputs);

//Functions 
function processInputs() {
    splitInputs(inputs);
    convertSecondElement();
    filterInput(filterNumber);
    sortInput();
    runConsoleInfo(); //what's happening? See console output
}

//Separate emails and completed tasks count
function splitInputs(inputs) {
    let n = inputs
    splitted = [];
    //go throug every element of the initial array
    for (let i = 0; i < n.length; i++) {
        //split elements separated by comma into separate arrays
        // and push them into new array splitted[]
        splitted.push((n[i].split(',')));
    }
}

//In order to work with numbers -- convert tasks count(string) to integer. 
function convertSecondElement() {
    //this variable is accessible only within this function
    let num;
    for (let i = 0; i < splitted.length; i++) {
        //convert every second element in prepared array to integer. 
        //Integer is required for filtering and sorting purposes
        num = parseInt((splitted[i][1]), 10);
        //change string value to new numeric value. 
        splitted[i][1] = num;
    }
}

//Take only those records where tasks count is greater or equal to filterNumber paramemeter
function filterInput(filterNumber) {
    filtered = [];
    for (let i = 0; i < splitted.length; i++) {
        //if count value is greater or equal to filterNumber...
        if (splitted[i][1] >= filterNumber) {
            //filtered[] is a new array where we push elements fitting the requirements
            filtered.push(splitted[i]);
        }
    }
}

//Sort filtered array by number value (descending).
//If there is a tie in numbers, sort by alphabet (descending).
function sortInput() {
    filtered.sort(function (a, b) {
        if (a[1] == b[1]) { //if there is a tie in tasks count
            let emailA = a[0].toUpperCase(); //uppercase to standartize all inputs
            let emailB = b[0].toUpperCase(); //uppercase to standartize all inputs
            if (emailA < emailB) {
                return -1;
            } else if (emailA > emailB) {
                return 1;
            }
            return b[0] - a[0]; //get return in any case (in case of duplicate email)
        }
        return b[1] - a[1]; //in all other cases, sort by numbers in descending order
    })
}

//Go throug every element of filtered[] and push only emails to new array output[]
function showOutput() {
    output = [];
    for (let i = 0; i < filtered.length; i++) {
        //push only emails to new array output[]
        output.push(filtered[i][0]);
    }
    return output;
}

//#endregion


//#region ADDITIONAL CODE

//Index page maintenance

//Generate table
function createTable() {
    let source = [];
    let sorted = false; //used for table headers. If == false ---> show Raw Data header

    if (output.length > 0) { //check if there is any data in output
        source = output;
        sorted = true;
    } else {
        source = inputs; //if output is empty use initial data
    }

    let headersArray = ["Raw Data", "Filtered & Sorted Data"];
    let header;
    (!sorted) ? header = headersArray[0]: header = headersArray[1];
    let initialInputTable = `<table class="table table-striped"><thead><tr>
    <th scope="col">#</th><th>${header}</th></tr></thead>`;
    for (let i = 0; i < source.length; i++) {
        initialInputTable += "<tr><td>" + (i + 1) + "</td>" + "<td>" + source[i] + "</td></tr>";
    }
    initialInputTable += "</table>";
    document.getElementById("initialTable").innerHTML = initialInputTable;
}


createTable();

//run addData on form submit
function addData() {
    //get values from elements
    let email = document.getElementById("inputEmail").value;
    let count = document.getElementById("inputTasksCount").value;
    //check if values entered and email is in the correct format
    if (email == "" || count == "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        alert("Please enter valid email and count")
        console.log(`Whoops, wrong input. Email is: ${email} and Count is: ${count}`)
        return;
    }
    //bring input to acceptable form
    let newInput = email + ',' + count;
    inputs.push(newInput)
    //re-run processInputs (we have a new input)
    processInputs();
    //add new input ot the table
    createTable();
    //let the user know what happened
    alert(`New input: ${newInput} added.`)
}

//listen to click event on btnFilter
document.getElementById('btnFilter').addEventListener('click', () => {
    //get value
    value = document.getElementById('inputTasksFilter').value
    //parse to integer
    value = parseInt(value);
    //check if we can proceed
    if (value >= 0 && !isNaN(value)) {
        filterNumber = value;
    }
    //let the user know  - something went wrong
    else if (value < 0 || isNaN(value)) {
        alert("Completed Tasks Count can't be less than 0 or string! \nPlease enter positive integer value")
        console.log(`Whoops, wrong input. Value is: ${value}`)
        return;
    }
    //re-run processInputs, we bring new value to readible format and re-order table if needed
    processInputs(filterNumber)
    //take only emails
    showOutput();
    //re-create the table with new values
    createTable();
    runConsoleInfo();
    console.log("We are sorting. Change the header, lit candles")
})

//console info
function runConsoleInfo() {
    console.log(console.clear())
    console.log(`Initial data: ${inputs}
    \nInitial data first element: ${inputs[0][0]}
    \nSplitted inputs: ${splitted}
    \nSplitted data: \nfirst element in 1st array: ${splitted[0][0]} \nsecond element in 1st array: ${splitted[0][1]}
    \nFiltered inputs: ${filtered}
    \nOutput : ${output}
    \nFilter number:${filterNumber}`)
}
//#endregion


