"use strict";

// Form validation
// Selecting all the elements 
const username = document.getElementById("Name"); 
const nameError = document.getElementById("nameError"); 
const userid = document.getElementById("ID");
const idError = document.getElementById("idError");
const emailAdd = document.getElementById("Email");
const emailError = document.getElementById("emailError");
const contactno = document.getElementById("Contact");
const contactError = document.getElementById("contactError");
const btn = document.getElementById("Submit-Btn");
const form = document.getElementById("Form-El");


const elements = [];
// Adding click event on the btn
btn.addEventListener("click", function(e){
e.preventDefault(); // stopping the form from submitting immediately on click
checkInput();
})
function checkInput(){
    // getting values
    let isValid = true;
    
    let name = username.value.trim() // checks if the user has accidentally added some space before typing the values
   
    // Checks for name error
    if (name.length === 0 || !/^[A-Za-z\s]+$/.test(name)) {
       addErrorClass(nameError, "Enter a valid name.");
       
    } else {
        nameError.innerText = " ";
        
    }

    // checks for id error
    let id = userid.value.trim()
    if (/^[0-9]+$/.test(id) && id.length < 6) {
        addErrorClass(idError, "ID must be at least 6 digits.");
        

    } else {
        idError.innerText = "";
       
    }
    
    // checks for email error
    let email = emailAdd.value.trim()
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        addErrorClass(emailError, "Enter a valid email.");
       
    } else {
        emailError.innerText = "";
      
    }

    // checks for contact error
    let contact = contactno.value.trim();
    if (!/^\d{10}$/.test(contact)) {  
        addErrorClass(contactError, "Enter a valid contact number containing 10 digits.");
    } else {

        contactError.innerText = "";
        
    }
    
    // if all conditions passed
    if (isValid) {
        alert("Form submitted successfully!");
        storedetails(name,id,email,contact)
        // emptying the user inputs after form submission
        username.value = "";
        userid.value= "";
        emailAdd.value= "";
        contactno.value="";
      removeErrorClass(nameError, "eg: John Doe"); // sends the inputs to removeErrorClass
      removeErrorClass(idError, "eg:253476 (should have 6 digits)");
      removeErrorClass(emailError, "eg: John_doe@gmail.com");
      removeErrorClass(contactError, "eg: 9820191756 (should contain 10 digits)");
       
    } 
}

// takes 2 parameters, the target element's small (error) item (eg nameError), and the message to be printed.
// addes the specified styling to the error item and prints the item with the message passed in it.
function addErrorClass(target, errormessage){
    target.classList.remove("message");
    target.classList.add("error");
    target.textContent = errormessage;
    return isValid = false;
}

// Once the form is submitted, resets the error message back to normal message (hint of the item to be validated)
function removeErrorClass(target, message){
    target.classList.remove("error");
    target.classList.add("message");
    target.textContent = message;
}

// function for storing user inputs
function storedetails(name,id,email,contact){
    elements.push({name:name,id:id,email:email,contact:contact})
    createRecord(elements)
}
function createRecord(arr){
    const newRec = document.createElement("div");
    newRec.classList.add("recordClass", "itemClass")
    arr.forEach((obj)=>
    {
        Object.keys(obj).forEach((index)=>{
        let newvalue = document.createElement("p");
            newvalue.textContent = `${obj[index]}`;
            newRec.append(newvalue);
        })
    
    })
    document.getElementById("record").append(newRec);
}