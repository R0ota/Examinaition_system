import { createPagination } from "./pagination.js";
import { handleFlagQuestion } from "./flag.js";

export function displayQuestion(
  index,
  questions,
  markedQuestions,
  updateMarkedQuestions,
  setCurrentQuestionIndex
) {
  const questionContainer = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");

  const currentQuestion = questions[index];

  // Display question text with a flag icon
  questionContainer.innerHTML = `
    ${currentQuestion.question}
<i class="fa-solid fa-flag" style="color: #FFD43B;"></i>
  `;

  // Display options
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${option.id}" />
      ${option.text}
    `;
    optionsContainer.appendChild(label);
  });

  // Add flagging functionality
  const flagIcon = document.querySelector(".fa-solid.fa-flag");
  if (flagIcon) {
    flagIcon.addEventListener("click", () => {
      handleFlagQuestion(
        currentQuestion.id,
        markedQuestions,
        updateMarkedQuestions
      );
    });
  }

  // Update pagination
  createPagination(index, questions.length, (newIndex) => {
    setCurrentQuestionIndex(newIndex);
    displayQuestion(
      newIndex,
      questions,
      markedQuestions,
      updateMarkedQuestions,
      setCurrentQuestionIndex
    );
  });
}
