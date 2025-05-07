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

// checks the localStorage if user has already submited an input and retrieves it if it is present. 
const elements = JSON.parse(localStorage.getItem("userDetail"))||[];

// loads the localstorage (recreating the table when the window loads)
window.onload = function(){
    createRecord(elements)
}
 
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
       isValid = false;
       
    } else {
        nameError.textContent = " ";
        
    }

    // checks for id error
    let id = userid.value.trim()
    if (/^[0-9]+$/.test(id) && id.length < 6) {
        addErrorClass(idError, "ID must be at least 6 digits.");
        isValid = false;
    } else {
        idError.textContent = "";
       
    }
    
    // checks for email error
    let email = emailAdd.value.trim()
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        addErrorClass(emailError, "Enter a valid email.");
        isValid = false;
    } else {
        emailError.textContent = "";
      
    }

    // checks for contact error
    let contact = contactno.value.trim();
    if (!/^\d{10}$/.test(contact)) {  
        addErrorClass(contactError, "Enter a valid contact number containing 10 digits.");
        isValid = false;
    } else {

        contactError.textContent = "";
        
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

// takes 2 parameters, the target element's small (error text) item (eg nameError), and the message to be printed.
// addes the specified styling to the error item and prints the item with the message passed in it.
function addErrorClass(target, errormessage){
    target.classList.remove("message");
    target.classList.add("error");
    target.textContent = errormessage;
   
}

// Once the form is submitted, resets the error text message back to normal message (hint of the item to be validated)
function removeErrorClass(target, message){
    target.classList.remove("error");
    target.classList.add("message");
    target.textContent = message;
}

// Creating records
// function for storing user inputs
function storedetails(name,id,email,contact){
    // checks if there are existing details in element array. If user input matches the items in the array, it will return otherwise it will append the object to the array.
    let existing = {name:name, id:id, email:email, contact:contact}
    if (elements.some(user => JSON.stringify(user) === JSON.stringify(existing))) {
        alert("We already have those elements");
        return;
    }
    
    else{
    elements.push({name:name,id:id,email:email,contact:contact}) // pushes items inside elements array in form of object 
    localStorage.setItem("userDetail", JSON.stringify(elements)) // converts them to string and stores it in localStorage in form of JSON object
    }
    
    if(localStorage.getItem("userDetail")){ //fetches the localStorage value. 
        return ; // If the storage is already present we will return null but if it isn't then we will create the table.  

    }
    else{
        createRecord(elements); // Used for creating the records (when user modifies them)
    }

   
}

//Passes the array(elements) of objects. Used for parsing them and creating a dom element (td) for each of the item (data) and storing it into table row
function createRecord(arr){
    // looping through the array element and getting each object
    arr.forEach((obj)=>
    {
    // creating parent row named newRec(new record) and adding it's styles
   let newRec = document.createElement("tr");

    newRec.classList.add("recordElements");
        // creating a paragraph item for each object (as a list item) and storing them in newRec 
        Object.keys(obj).forEach((index)=>{
        let newvalue = document.createElement("td");
        newvalue.classList.add("p-3")
            newvalue.textContent = `${obj[index]}`;
            newRec.append(newvalue);
        })
    // creating updatebtn and deletebtn explicitly as they are not part of the element array. Storing them inside the newRec
    const update_cell = document.createElement("td"); // creating cell for update button
    update_cell.classList.add("p-3")
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update record";
    updateBtn.classList.add("update");
    update_cell.append(updateBtn);

    const delete_cell = document.createElement("td"); // creating cell for delete button
    delete_cell.classList.add("p-3")
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="Delete record";
    deleteBtn.classList.add("del");
    delete_cell.append(deleteBtn)
    newRec.append(update_cell, delete_cell);
    updateBtn.addEventListener("click", updateRecord)
    deleteBtn.addEventListener("click", deleteRecord)
    document.getElementById("record-body").append(newRec);
    })
}
function updateRecord(e) {
    e.preventDefault();

    const selectedbtn = e.target;
    
    if (selectedbtn.classList.contains("update")) {
        const recordRow = selectedbtn.parentElement.parentElement; // Get the row
        const recordIndex = Array.from(recordRow.parentElement.children).indexOf(recordRow); // Get row index
        const selectedUser = elements[recordIndex]; // Get the corresponding object

        // Prefill form fields with existing values
        username.value = selectedUser.name;
        userid.value = selectedUser.id;
        emailAdd.value = selectedUser.email;
        contactno.value = selectedUser.contact;

        // Modify the save button to update the record instead of adding a new one
        btn.textContent = "Update Record";

        btn.onclick = function(e) {
            e.preventDefault();

            // Update object with new values
            elements[recordIndex] = {
                name: username.value.trim(),
                id: userid.value.trim(),
                email: emailAdd.value.trim(),
                contact: contactno.value.trim()
            };

            // Save updated array to local storage
            localStorage.setItem("userDetail", JSON.stringify(elements));

            // Reset button text to original
            btn.textContent = "Submit";

            // Clear input fields after update
            username.value = "";
            userid.value = "";
            emailAdd.value = "";
            contactno.value = "";

            // Refresh table
            document.getElementById("record-body").innerHTML = ""; // Clear table
            createRecord(elements); // Re-create table with updated values
        };
    }
}
function deleteRecord(e){
    e.preventDefault();
const selectedbtn = e.target;
if (selectedbtn.classList.contains("del")){
    const recordcell = selectedbtn.parentElement.parentElement;
    console.log(recordcell)
        const recordIndex = Array.from(recordcell.parentElement.children).indexOf(recordcell);
        console.log(recordIndex)
        elements.splice(recordIndex, 1); // Remove from array
        localStorage.setItem("userDetail", JSON.stringify(elements)); // Update storage
        
        recordcell.remove(); // Remove from DOM

}
}

