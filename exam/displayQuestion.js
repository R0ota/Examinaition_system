// Import necessary modules and functions.
import { toggleFlag } from "./flag.js";
import { updateMarkedQuestions } from "./markQuestion.js";
import { setAnswers, getAnswers } from "./savedAnswers.js";
import { calculateScore } from "./score.js";

// Function to display a specific question and its options in the UI.
export function displayQuestion(index, questions, markedQuestions, onNavigate) {
  // Select HTML elements where the question and options will be displayed.
  const questionContainer = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  // Retrieve the current question based on the index provided.
  const currentQuestion = questions[index];
  // Fetch the saved answer for this question, if it exists.
  const savedAnswer = getAnswers(currentQuestion.id);

  // Display the current question text and a flag icon that indicates whether the question is marked.
  questionContainer.innerHTML = `
    <div class="question-text">
      <span>Question ${index + 1}: </span>${currentQuestion.question}
      <svg 
        class="flag-icon ${
          markedQuestions.includes(currentQuestion.id) ? "flagged" : ""
        }" 
        data-id="${currentQuestion.id}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        title="Flag"
      >
        <path 
          d="M48 32C48 14.3 33.7 0 16 0S-16 14.3-16 32L-16 480c0 17.7 14.3 32 32 32s32-14.3 32-32L48 288 192 352 352 288 480 352 448 0 352-32 192 0 48-32z"
        />
      </svg>
    </div>
  `;

  // Add an event listener to the flag icon for toggling the flagged status of the question.
  const flagIcon = document.querySelector(".flag-icon");
  flagIcon.addEventListener("click", () => {
    toggleFlag(
      currentQuestion.id,
      markedQuestions,
      (updatedList) => {
        markedQuestions = updatedList; // Update the marked questions list.
        updateMarkedQuestions(markedQuestions, questions); // Reflect the update in the UI.
      },
      flagIcon
    );
  });

  // Display options for the current question and set up event listeners for selection.
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${option.id}" />
      ${option.text}
    `;
    const input = label.querySelector("input");
    if (input.value === savedAnswer) {
      input.checked = true; // Mark the saved answer as checked if it exists.
    }

    input.addEventListener("change", () => {
      setAnswers(currentQuestion.id, input.value); // Save the selected answer.
      calculateScore(questions); // Recalculate score based on new answer.
    });

    optionsContainer.appendChild(label);
  });

  // Setup navigation buttons for moving to next and previous questions.
  if (onNavigate) {
    const nextButton = document.querySelector(".next-button");
    const prevButton = document.querySelector(".prev-button");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (index < questions.length - 1) {
          onNavigate(index + 1); // Navigate to the next question.
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (index > 0) {
          onNavigate(index - 1); // Navigate to the previous question.
        }
      });
    }
  }
}
