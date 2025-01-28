let savedMail = localStorage.getItem("Email");
let savedPass = localStorage.getItem("Password");
const form = document.getElementById("registrationForm");
const passwordValidation = document.getElementById("passValidation");
const emailValidation = document.getElementById("emailValidation");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
console.log(savedMail);
console.log(savedPass);

// Disable back button if there is saved data
if (savedMail && savedPass) {
  // Change the hash to disable the back button
  window.location.hash = "no-back-button";

  // Listen for the hash change to prevent going back
  window.onhashchange = function() {
    window.location.hash = "no-back-button";
  };

  // Override the default back button behavior
  window.addEventListener("keydown", function (e) {
    if (e.key === "Backspace" || (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight"))) {
      e.preventDefault();
    }
  });
}

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
    
  if (email !== savedMail || password !== savedPass) {
    // emailValidation.innerText = "This Email isn't registered !";
    // emailValidation.style.display = "block";
      // return false;

      //security 
      passwordValidation.innerText = "Incorrect Email or Password";
      passwordValidation.style.display = "block";
      return false;
  }
  emailValidation.style.display = "none";
  return true;
}

// Form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    
  const isValid = validateAll();

  if (
    !isValid
  ) {
      return;  } else {
    // Redirect to any page
    window.location.href = "../start exam/index.html";
  }
});
