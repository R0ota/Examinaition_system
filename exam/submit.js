// Reference to the submit button in the HTML document.
const submitButton = document.querySelector(".submit-button");

// Function attached to the submit button to handle its click event.
export function submitAction(questions) {
  // Add an event listener to the submit button for the 'click' event.
  submitButton.addEventListener("click", () => {
    // Retrieve the answers object from local storage or initialize an empty object if none exist.
    const answers = JSON.parse(localStorage.getItem("answers") || "{}");
    // Filter out questions that do not have an answer in the local storage.
    const unansweredQuestions = questions.filter(
      (question) => !answers[question.id]
    );

    // Select the element intended to display error messages, if any.
    const errorMessage = document.querySelector(".error-message");
    // Check if there are any unanswered questions.
    if (unansweredQuestions.length > 0) {
      // If there are unanswered questions and no error message is currently displayed, create and display one.
      if (!errorMessage) {
        const message = document.createElement("div");
        message.className = "error-message";
        message.style.color = "red";
        message.style.marginTop = "10px";
        message.textContent =
          "You have to answer all questions before submitting!";
        submitButton.parentElement.appendChild(message);
      }
    } else {
      // If all questions are answered, remove any existing error message.
      if (errorMessage) errorMessage.remove();
      // Redirect the user to the results page.
      window.location.href = "../result/index.html";
    }
  });
}
