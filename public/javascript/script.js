document.getElementById("guestbook-form").onsubmit = function(event) {
    let isValid = true;

    clearErrors(); // Clear previous errors
    checkMe();
    validateMeeting();
    validateLinkedIn();
    validateEmail();
    validateMailingList();

    // Validate required fields
    isValid = validateRequiredFields() && isValid; // fFirst name and Last name 
    isValid = validateMeeting() && isValid; //how we met validation
    
            
    // Prevent form submission if validation fails but if met requirements then it will submit
    if (!isValid) {
        event.preventDefault();
    }   

}

//required fields
function validateRequiredFields() {
    let isValid = true;

    // Validate First Name 
    let first = document.getElementById("fname").value;
    if (first == "") {  
        document.getElementById("err-fname").style.display = "inline"; // Show error message for first name
        isValid = false;
    }

    // Validate Last Name 
    let last = document.getElementById("lname").value;
    if (last == "") {  
        document.getElementById("err-lname").style.display = "inline";
        isValid = false;
    }
    
    return isValid;
}

// clears the errors notifs once the input is valid
function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none"; 
    }
}

// Validate Email input
function validateEmail() {
    //Validate Email Input
    let email = document.getElementById("email").value;
    let isValid = true; 

    if (email == "") {  
        document.getElementById("err-email").style.display = "inline"; 
        isValid = false;
    } else if (!email.includes("@")) {
        document.getElementById("err-email").innerText = "Email must contain an '@' symbol";        
        document.getElementById("err-email").style.display = "inline"; 
        isValid = false;
    } else if (!email.includes(".")) {
        document.getElementById("err-email").innerText = "Email must contain a '.' symbol";
        document.getElementById("err-email").style.display = "inline"; 
        isValid = false;
    }

    return isValid;
}

// If checkbox is chosen then the emailFormat buttons are visible
function checkMe(){
        let cb = document.getElementById("checkbox");
        let text = document.getElementById("emailFormat");
        if(cb.checked == true) {
            text.style.display = "block";
        } else {
            text.style.display = "none";
        }
}

function validateMailingList() {
     let isValid = true;
     // Validate Mailing List Checkbox
     let mailingListCheckbox = document.getElementById("checkbox");
     let emailInput = document.getElementById("email"); // Assuming there's an email input field
     let email = emailInput.value; // Get the email value
     let errorDisplay = document.getElementById("err-check");
 
     if (mailingListCheckbox.checked && email === "") {
         errorDisplay.innerText = "Email is required.";
         errorDisplay.style.display = "inline"; 
         isValid = false;
     } else {
         errorDisplay.style.display = "none"; // Hide error message if validation passes
     }
     
     return isValid;
}

// Validate How did we meet
function validateMeeting() {
    let isValid = true;

    let meetSelect = document.getElementById("meet-select").value;
    let errorMessage = document.getElementById("err-meet");

    if (meetSelect == 'none') {
        errorMessage.style.display = "inline"; // Show error message
        isValid = false; // Set isValid to false
    } else {
        errorMessage.style.display = "none"; // Hide error message
        isValid = true; // Set isValid to true
    }

    // Check for "Other" option
    if (meetSelect == 'other') {
        selectedOther();
    } else {
        document.getElementById("otherOption").style.display = "none"; // Hide the other input if not selected
    }
    
    return isValid;
}

// the other textbox that pops up if option "other" is chosen
function selectedOther() {
    let meetSelect = document.getElementById("meet-select").value;
    let otherOp = document.getElementById("otherOption");
    
    // Show the "Other" input only if "Other" is selected
    if (meetSelect === 'other') {
        otherOp.style.display = "block";
    } else {
        otherOp.style.display = "none";
    }
}

// Validate LinkedIn
function validateLinkedIn() {
    let LinkedIn = document.getElementById("LinkedIn").value;
    let lin = "https://linkedin.com/in/";
    let isValid;

    // Check if the input is empty
    if (LinkedIn === "") {
        document.getElementById("err-linked").innerText = "LinkedIn URL cannot be empty.";
        document.getElementById("err-linked").style.display = "none"; 
        isValid = false;
    } 

    // Check if the input starts with the correct prefix
    else if (!LinkedIn.startsWith(lin)) {
        document.getElementById("err-linked").innerText = "Must start with \"https://linkedin.com/in/\"";        
        document.getElementById("err-linked").style.display = "inline"; 
        isValid = false;
    } else {
        document.getElementById("err-linked").style.display = "none"; 
        isValid = true; 
    }

    return isValid; // Return the validation result if needed
}