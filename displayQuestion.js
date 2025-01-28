import { toggleFlag } from "./flag.js";
import { updateMarkedQuestions } from "./markQuestion.js";

export function displayQuestion(index, questions, markedQuestions, onNavigate) {
  const questionContainer = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  const currentQuestion = questions[index];

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

  const flagIcon = document.querySelector(".flag-icon");
  flagIcon.addEventListener("click", () => {
    toggleFlag(
      currentQuestion.id,
      markedQuestions,
      (updatedList) => {
        markedQuestions = updatedList;
        updateMarkedQuestions(markedQuestions, questions);
      },
      flagIcon
    );
  });

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${option.id}" />
      ${option.text}
    `;
    optionsContainer.appendChild(label);
  });
}
