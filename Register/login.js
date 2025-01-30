let savedMail = localStorage.getItem("Email");
let savedPass = localStorage.getItem("Password");
const form = document.getElementById("registrationForm");
const passwordValidation = document.getElementById("passValidation");
const emailValidation = document.getElementById("emailValidation");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const haveAcoount = document.getElementById("haveAcc");

haveAcoount.style.display = "none";

//hide error msg when entering new input
emailInput.addEventListener("input", () => {
  emailValidation.style.display = "none";
  passwordValidation.style.display = "none";
  haveAcoount.style.display = "none";
});

passwordInput.addEventListener("input", () => {
  passwordValidation.style.display = "none";
  haveAcoount.style.display = "none";
});

// required msg on blur
emailInput.addEventListener("blur", () => {
  if (!emailInput.value.trim()) {
    emailValidation.innerText = "Email is required.";
    emailValidation.style.display = "block";
  }
});

passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value.trim()) {
    passwordValidation.innerText = "Password is required.";
    passwordValidation.style.display = "block";
  }
});

function validateAll() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email) {
    emailValidation.innerText = "Email is required.";
    emailValidation.style.display = "block";
    return false;
  }
  if (!password) {
    passwordValidation.innerText = "Password is required.";
    passwordValidation.style.display = "block";
    return false;
  }

  // attach saved users
  let users = JSON.parse(localStorage.getItem("users")) || [];
  // if user found or not
  let foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    passwordValidation.innerText = "Incorrect Email or Password";
    passwordValidation.style.display = "block";
    haveAcoount.style.display = "block";
    return false;
  }

  // save current user to use his name in result
  localStorage.setItem("currentUser", JSON.stringify(foundUser));
  return true;
}

// on click on submit if all valid go to next page.
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateAll()) {
    window.location.href = "../start exam/index.html";
  }
});
