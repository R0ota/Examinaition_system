// Select elements
const form = document.getElementById("registrationForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Select validation message elements
const firstNameValidation = document.getElementById("nameValidation");
const lastNameValidation = document.getElementById("lastNameValidation");
const emailValidation = document.getElementById("emailValidation");
const passwordValidation = document.getElementById("passValidation");
const confirmPasswordValidation = document.getElementById(
  "confirmPassValidation"
);

//eye in pass
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  }
});
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
toggleConfirmPassword.addEventListener("click", function () {
  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  } else {
    confirmPasswordInput.type = "password";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  }
});



// //prevent resullt to come back to exam
function preventBack() {
  window.history.forward();
}
setTimeout(preventBack, 0);
window.addEventListener("popstate", function (event) {
  preventBack();
});


// Regex patterns
const nameRegex = /^[A-Za-z\s]{3,}$/; // Only letters and spaces
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_])[A-Za-z\d@$!%*?&.\-_]{8,}$/; // Password criteria

// Validation functions
function validateName(inputElement, validationElement) {
  const name = inputElement.value.trim();
  if (!name) {
    validationElement.innerText = "This field is required.";
    validationElement.style.display = "block";
    return false;
  }
  if (!nameRegex.test(name)) {
      validationElement.innerText =
          "This field can only contain letters and spaces & at least 3 characters.";
      validationElement.style.display = "block";
    return false;
  }
  validationElement.style.display = "none";
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  let savedMail = localStorage.getItem("Email");

  if (!email) {
    emailValidation.innerText = "Email is required.";
    emailValidation.style.display = "block";
    return false;
  }
  if (!emailRegex.test(email)) {
    emailValidation.innerText = "Email must be in the format: user@example.ex";
    emailValidation.style.display = "block";
    return false;
  }
  if (email === savedMail) {
    emailValidation.innerText =
      "This Email already exists !";
    emailValidation.style.display = "block";
    return false;
  }
  emailValidation.style.display = "none";
  return true;
}
// Divide password errors
function validatePassword() {
  const password = passwordInput.value.trim();
  if (!password) {
    passwordValidation.innerText = "Password is required.";
    passwordValidation.style.display = "block";
    return false;
  }
  if (password.length < 8) {
    passwordValidation.innerText = "Password must be at least 8 characters long.";
    passwordValidation.style.display = "block";
    return false;
  }
  if (!passwordRegex.test(password)) {
    passwordValidation.innerText =
      "Password must include an uppercase letter, a lowercase letter, a number, and a special character (@, $, !, %, _, -, *, ?, &, or .).";
    passwordValidation.style.display = "block";
    return false;
  }
  passwordValidation.style.display = "none";
  return true;
}

function validateConfirmPassword() {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  if (!confirmPassword) {
    confirmPasswordValidation.innerText = "Confirm password is required.";
    confirmPasswordValidation.style.display = "block";
    return false;
  }
  if (password !== confirmPassword) {
    confirmPasswordValidation.innerText = "Passwords do not match.";
    confirmPasswordValidation.style.display = "block";
    return false;
  }
  confirmPasswordValidation.style.display = "none";
  return true;
}

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isFirstNameValid = validateName(firstNameInput, firstNameValidation);
  const isLastNameValid = validateName(lastNameInput, lastNameValidation);
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (
    !isFirstNameValid ||
    !isLastNameValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || []; //return saved data ot an empty array;

  //make sure email isn't repeated
  if (users.some((user) => user.email === emailInput.value)) {
    emailValidation.innerText = "This Email already exists !";
    emailValidation.style.display = "block";
    return;
  }

  // add new user to the array
  let newUser = {
    fullName: firstNameInput.value + " " + lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // locate to login
  window.location.href = "login.html";
});


// Real-time validation on blur ((leaving the input)).
firstNameInput.addEventListener("blur", () =>
  validateName(firstNameInput, firstNameValidation)
);
lastNameInput.addEventListener("blur", () =>
  validateName(lastNameInput, lastNameValidation)
);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
