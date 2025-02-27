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

    let errorMessage = document.querySelector(".error-message");

    if (unansweredQuestions.length > 0) {
      if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent =
          " You have to answer all questions before submitting!";
        submitButton.parentElement.appendChild(errorMessage);
      }
    } else {
      // If all questions are answered, remove any existing error message.
      if (errorMessage) errorMessage.remove();
      // Redirect the user to the results page.
      window.location.href = "../result/index.html";
    }
  });
}
