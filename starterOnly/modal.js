function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const AllInputs = Array.from(document.querySelectorAll("form input"));
const toCheck = ["first", "last", "email", "birthdate", "quantity", "checkbox1"];
const inputs = AllInputs.filter(input => toCheck.includes(input.id));
const radioInputs = AllInputs.filter(input => input.type == "radio");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function displayError(input) {
  input.parentNode.setAttribute('data-error-visible', true);
}

function hideError(input) {
  input.parentNode.setAttribute('data-error-visible', false);
}

// functions to test inputs
function test_first(input) {
  return input.value.trim().length > 1 ? true : false;
}

function test_last(input) {
  return test_first(input);
}

function test_email(input) {
  const regex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(input.value);
}

function test_birthdate(input) {
  return input.value.length > 0 ? true : false;
}

function test_quantity(input) {
  let num = parseInt(input.value);
  if (num != NaN) {
    return num >= 0 ? true : false;
  }
  return false;
}

function test_checkbox1(input) {
  return input.checked;
}

function validate() {
  let inputAnswers = [];

  inputs.forEach( 
    (input) => {
      if (window['test_' + input.id](input)) {
        inputAnswers.push(true);
        hideError(input);
      } else {
        inputAnswers.push(false);
        displayError(input);
      }

      // TODO: si tout est vrai dans inputAnswers alors on envoie le formulaire = afficher message de réussite
      if (inputAnswers.every(i => i==true))
        sendForm()
  })
  return false;
}

function sendForm() {
  // TODO: afficher un msg de confirmation
  // reset le formulaire
}
