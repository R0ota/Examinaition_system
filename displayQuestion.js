import { toggleFlag } from "./flag.js";
import { updateMarkedQuestions } from "./markQuestion.js";
import { setAnswers, getAnswers } from "./savedAnswers.js";
import { calculateScore } from "./score.js";

export function displayQuestion(index, questions, markedQuestions, onNavigate) {
  const questionContainer = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  const currentQuestion = questions[index];
  const savedAnswer = getAnswers(currentQuestion.id);

//display question with flag
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
        title="Flag Question"
      >
        <path 
          d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z"
        />
      </svg>
    </div>
  `;

  //flag toggle
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

  //display options
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${option.id}" />
      ${option.text}
    `;
    const input = label.querySelector("input");
    if (input.value === savedAnswer) {
      input.checked = true;
    }

    input.addEventListener("change", () => {
      setAnswers(currentQuestion.id, input.value);
      calculateScore(questions); //change score when ans is changed
    });

    optionsContainer.appendChild(label);
  });

  if (onNavigate) {
    const nextButton = document.querySelector(".next-button");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (index < questions.length - 1) {
          onNavigate(index + 1);
        }
      });
    }

    const prevButton = document.querySelector(".prev-button");
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (index > 0) {
          onNavigate(index - 1);
        }
      });
    }
  }
}
