document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document.getElementById("formSuccess").textContent = "";

    // First Name Validation
    const firstName = document.getElementById("firstName").value.trim();
    if (!/^[A-Za-z]+$/.test(firstName)) {
      document.getElementById("firstNameError").textContent =
        "First name must contain only letters.";
      isValid = false;
    }

    // Last Name Validation
    const lastName = document.getElementById("lastName").value.trim();
    if (!/^[A-Za-z]+$/.test(lastName)) {
      document.getElementById("lastNameError").textContent =
        "Last name must contain only letters.";
      isValid = false;
    }

    // Email Validation
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    // Password Validation
    const password = document.getElementById("password").value;
    if (password.length < 8) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 8 characters long.";
      isValid = false;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[@$!%*?&#]/.test(password)
    ) {
      document.getElementById("passwordError").textContent =
        "Password must include uppercase, lowercase, number, and special character.";
      isValid = false;
    }

    // Confirm Password Validation
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword !== password) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
      isValid = false;
    }

    // Success Message
    if (isValid) {
      document.getElementById("formSuccess").textContent =
        "Registration Successful!";
    }
  });
