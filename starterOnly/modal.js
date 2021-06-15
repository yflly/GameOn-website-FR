// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelectorAll(".bground .close")[0];
const modalBtnCloseConfirm = document.querySelectorAll(".bgroundConfirm .close")[0];
const modalbgConfirm = document.querySelector(".bgroundConfirm");
const btnSubmit = document.querySelectorAll("#btn-submit");

//Form elements
const firstName =document.getElementById("first");
const lastName =document.getElementById("last");
const email =document.getElementById("email");
const birthDate =document.getElementById("birthdate");
const quantity =document.getElementById("quantity");
let city =document.getElementsByName("location");
const conditionAcceptation =document.getElementById("checkbox1");
const formulaire = document.getElementById("myForm"); 

const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

//FUNCTIONS
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
  modalBtnClose.addEventListener("click", closeModal);
  modalbgConfirm.addEventListener("click", closeConfirmation)

// close modal form
function closeModal() {
  modalbg.style.display = "none"; 
  modalbgConfirm.style.display = "none";
}

//On ajoute le message d'erreur dans le html
function errorMessage(id,message){
  document.getElementById(id).innerHTML = message;
  return false
};

 //Close modal de confirmation
 function closeConfirmation() {
  closeModal();
 //document.getElementById("myForm").submit();
 document.getElementById("myForm").reset();
}

// Valider le formulaire par submit
function valideForm() {
  document.getElementById("myForm").submit();
 }


//Contrôle des champs de saisies
function validateInput(e){
  const errors = [];

  //Validation Firstname
  if (firstName.value.trim().length < 2 ){
   
   errors.push({
     id: "errorMessageFirst",
      message: "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    });

    firstName.style.borderColor= "red";
  }else{
    firstName.style.borderColor= "transparent";

  }

  
  //Validation Lastname
  if (lastName.value.trim().length < 2 ){
   
    errors.push({
      id: "errorMessageLast",
      message: "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    });

    lastName.style.borderColor= "red";
  }else{
    lastName.style.borderColor= "transparent";

  }


  //Validation email
  if (!regex.test(email.value.trim())){
   
    errors.push({
      id: "errorMessageEmail",
      message: "Veuillez saisir une adresse électronique valide."
    });

    email.style.borderColor= "red";
  }else{
    email.style.borderColor= "transparent";

  }


  //Validation birthdate
  if (birthDate.value.trim() == ""){

    e.preventDefault();
    errors.push({
      id: "errorMessageBirthdate",
      message: "Vous devez entrer votre date de naissance."
    });

    birthDate.style.borderColor= "red";
  }else{
    birthDate.style.borderColor= "transparent";

  }


  //Validation number participation
  if(quantity.value.trim() ==""){

    errors.push({
      id: "errorMessageQuantity",
      message: "Vous devez entrer un nombre entre 0 et 99."
    });  

    quantity.style.borderColor= "red";
  }else{
    quantity.style.borderColor= "transparent";

  }


  //Validation city  
  var cityValid = false;
  var i = 0;

  while (!cityValid && i < city.length) {
    if (city[i].checked) cityValid = true;
    i++;
  }
  if (!cityValid) {

    errors.push({
      id: "errorMessageCity",
      message: "Vous devez choisir une option."
    });  

  } 


  //Validation condition
  if(conditionAcceptation.checked =="") {

    errors.push({
      id: "errorMessageconditionAcceptation",
      message: "Vous devez vérifier que vous acceptez les termes et conditions."
    });  

  }  
    return errors //nous retournons les erreurs

} //Fin de la fonction ValidateInput(e)


//Si un champs est erroné on affiche le message d'erreur sinon message de confirmation 
document.forms["reserve"].addEventListener("submit", handleFormSubmit);

function handleFormSubmit(ev){ // handler
  // reinitialiser les messages d'erreurs (tous)
  [ ...document.getElementsByClassName('errorMessage') ].forEach(function(el) { errorMessage(el.id, "") })
  const errors = validateInput(ev)
  ev.preventDefault();
  if (errors.length > 0) {
    //console.log(errors);
    errors.forEach(({ id, message }) => errorMessage(id, message))
  }else{ 
    modalbgConfirm.style.display="block";

    /* fetch('/api/myForm', {
      method: "POST",
      body: document.forms["reserve"].formData
    }).then(() => {
      modalbgConfirm.style.display="block";
    }).catch((err) => console.error(err)) */       

  }  
 
}

// A la validation de la modal de confirmation, on lance la function closeConfirmation
 let btnsubmit = document.getElementsByClassName("button-close").item(0)
 btnsubmit.addEventListener("click", closeConfirmation);

 

 










