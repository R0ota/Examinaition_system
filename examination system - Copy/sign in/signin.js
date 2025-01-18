document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signInForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document.getElementById("formSuccess").textContent = "";

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
  });
});
