function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const form = document.querySelector('form');
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
// const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const AllInputs = Array.from(document.querySelectorAll("form input"));
const toCheck = ["first", "last", "email", "birthdate", "quantity", "checkbox1"];
const inputs = AllInputs.filter(input => toCheck.includes(input.id));
const radioInputs = AllInputs.filter(input => input.type == "radio");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

function hideForm() {
  form.style.display = "none";
}

function displayForm() {
  form.style.display = "block";
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  displayForm();

  let confirmMsg = document.querySelector("#confirmMessage");
  if (confirmMsg) {
    confirmMsg.remove();
  }
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

function resetInputsError() {
  AllInputs.forEach(i => i.hideError());
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

function displayConfirmationMessage() {
  hideForm();

  let confirmMessage = document.createElement("div");
  confirmMessage.setAttribute("id", "confirmMessage");
  confirmMessage.innerHTML = `
    <h2>Merci pour votre participation !</h2>
    <button id="closeConfirmMessage" class="">Fermer</button>
  `
  modalBody.appendChild(confirmMessage);

  let btn = document.querySelector("#closeConfirmMessage");
  btn.addEventListener("click", closeModal);
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

    if (radioInputs.some(r => r.checked)) {
      inputAnswers.push(true);
      hideError(radioInputs[0]);
    } else {
      inputAnswers.push(false);
      displayError(radioInputs[0]);
    }

      // Si tout est vrai dans inputAnswers alors on envoie le formulaire
      if (inputAnswers.every(i => i==true))
        sendForm()
  })
  return false;
}

function sendForm() {
  // reset le formulaire
  form.reset();
  // resetInputsError();
  displayConfirmationMessage();
}
