const submitButton = document.querySelector(".submit-button");

// Submit button handler
export function submitAction(questions) {
  submitButton.addEventListener("click", () => {
    const answers = JSON.parse(localStorage.getItem("answers") || "{}");
    const unansweredQuestions = questions.filter(
      (question) => !answers[question.id]
    );

    const errorMessage = document.querySelector(".error-message");
    if (unansweredQuestions.length > 0) {
      //if not all questions are answered display err msg
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
      //if all are answered remove err msg and go to result
      if (errorMessage) errorMessage.remove();
      window.location.href = "../result/index.html";
    }
  });
}
