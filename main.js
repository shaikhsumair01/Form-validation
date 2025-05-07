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

// loads the localstorage (creating the table when the window loads)
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
    
    let name = username.value.trim() 
    // checks if the user has accidentally added some space before typing the values
   
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

/* takes 2 parameters, the target element's "small" [/inline para](which is the error text) item (eg nameError),
 and the message to be printed.
addes the specified styling to the error item and 
prints the item with the message passed in it.*/
function addErrorClass(target, errormessage){
    target.classList.remove("message");
    target.classList.add("error");
    target.textContent = errormessage;
   
}

/* Once the form is submitted, resets the error text message back to normal message 
(hint of the item to be validated)*/
function removeErrorClass(target, message){
    target.classList.remove("error");
    target.classList.add("message");
    target.textContent = message;
}

// Creating records
// function for storing user inputs
function storedetails(name,id,email,contact){
    /* checks if the array contains the same object as the object called "existing".
     If user input (which are stored in object "existing") matches the items in the array, 
     it will return the function, 
     otherwise it will append the object to the array.*/
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
        return ; 
        /*If the storage is already present we will return it since 
        we don't want to do anything with it for now.
        But if it is empty then we will add the table elements.*/  

    }
    else{
        createRecord(elements); // Used for creating new records (when user modifies them)
    }

   
}

/*Passes the array(elements) of objects.
 Used for parsing them and creating a dom element (td) for each of the item (data) 
 and store it into table row*/
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
        newvalue.classList.add("p-3");
            newvalue.textContent = `${obj[index]}`;
            newRec.append(newvalue);
        })
    /* creating updatebtn and deletebtn explicitly as they are not part of the element array. 
    Storing them inside the newRec*/
    const update_cell = document.createElement("td"); // creating cell for update button
    update_cell.classList.add("p-3");
    const updateBtn = document.createElement("button"); // creating update button
    updateBtn.textContent = "Update record";
    updateBtn.classList.add("update"); 
    update_cell.append(updateBtn); // adding it to the update cell

    const delete_cell = document.createElement("td"); // creating cell for delete button
    delete_cell.classList.add("p-3")
    const deleteBtn = document.createElement("button"); // creating delet button
    deleteBtn.textContent="Delete record";
    deleteBtn.classList.add("del");
    delete_cell.append(deleteBtn); // adding delete button to delete cell
    newRec.append(update_cell, delete_cell); // appending update cell and delete cell to newRecord
    updateBtn.addEventListener("click", updateRecord) // adding update button functionality
    deleteBtn.addEventListener("click", deleteRecord) // adding delete button functionality
    document.getElementById("record-body").append(newRec); // adding newRecord to the dom
    })
}

function updateRecord(e) {
    e.preventDefault(); // don't want to cause any event 

    const selectedbtn = e.target; // locates where the event triggered
   
    if (selectedbtn.classList.contains("update")) {
        const recordRow = selectedbtn.parentElement.parentElement; 

        // Gets the row in which the td of select btn is present (where the event triggered)
        // update btn-> td -> recordRow = tr  
        const recordIndex = Array.from(recordRow.parentElement.children).indexOf(recordRow);

         // Get row index of the tbody's children. 
         // (tr.parent = tbody.. tbody.children => nodelist of tr=> indexOf(recordRow) == row where the click triggered)

        const selectedUser = elements[recordIndex]; 
        // Get the corresponding object which contains our required details to be updated

        // Prefill form fields with existing values which we have typed and stored
        username.value = selectedUser.name;
        userid.value = selectedUser.id;
        emailAdd.value = selectedUser.email;
        contactno.value = selectedUser.contact;

        // Modifying the save button to update the record instead of adding a new one
        btn.textContent = "Update Record";

        btn.onclick = function(e) {
            e.preventDefault();

            // Update object with new values
            elements[recordIndex] = {
                name: username.value.trim(),
                id: userid.value.trim(),
                email: emailAdd.value.trim(),
                contact: contactno.value.trim(),
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
            JSON.parse(localStorage.getItem("userDetail")).splice(recordIndex,1);
            elements.splice(recordIndex, 1);
            if(localStorage.getItem("userDetail")){
                console.log(localStorage.getItem("userDetail"));
                return ;
            }
            else{
                createRecord(elements); // Re-create table with updated values
            }
        };
    }
}
function deleteRecord(e){
    e.preventDefault();
const selectedbtn = e.target; // selects the button we clicked
if (selectedbtn.classList.contains("del")){
    const recordRow = selectedbtn.parentElement.parentElement; 
    /* selects the record row in which the click event took place 
    (since button is inside a td which is the parent. 
     And the td's parent is tr (the row in which the button is present))*/
    
        const recordIndex = Array.from(recordRow.parentElement.children).indexOf(recordRow);
    //    recordRow.parentElement = tbody. tbody.child would be all the rows created and appended (which is basically a node list).

        elements.splice(recordIndex, 1); // Remove from array from the nodelist at the index position of the click event
        localStorage.setItem("userDetail", JSON.stringify(elements)); // Update storage so that the deleted value is removed from the browser
        
        recordRow.remove(); // Remove from DOM

}
}

