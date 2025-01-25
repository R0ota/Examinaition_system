import { questions } from "./questions.js";
import { createPagination } from "./pagination.js";
import { handleFlagQuestion } from "./flag.js";
import { handleDeleteQuestion } from "./delete.js";
import { timeDown } from "./timer.js";
import { submitAction } from "./submit.js";

const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const markedList = document.querySelector(".marked-list");

let currentQuestionIndex = 0;
let markedQuestions = [];
//timer
timeDown();
// Function to display a question
function displayQuestion(index) {
  const currentQuestion = questions[index];

  // Display question text with a flag icon
  questionContainer.innerHTML = `
    ${currentQuestion.question}
    <svg 
      class="flag-icon"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 448 512" 
      title="Flag Question"
    >
      <path 
        d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z"
      />
    </svg>
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
  const flagIcon = document.querySelector(".flag-icon");
  if (flagIcon) {
    flagIcon.addEventListener("click", () => {
      flagIcon.classList.toggle("flagged");
      handleFlagQuestion(
        currentQuestion.id,
        markedQuestions,
        updateMarkedQuestions
      );
    });
  }

  // Update pagination
  createPagination(index, questions.length, (newIndex) => {
    currentQuestionIndex = newIndex;
    displayQuestion(newIndex);
  });
}

// Function to update marked questions
function updateMarkedQuestions(updatedList = markedQuestions) {
  markedQuestions = updatedList;
  markedList.innerHTML = ""; // Clear list

  markedQuestions.forEach((id) => {
    const li = document.createElement("li");
    li.innerHTML = `
      Question ${id}
      <svg 
        class="delete-icon"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512" 
        title="Delete"
      >
        <path 
          d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
        />
      </svg>
    `;

    // Add delete functionality
    li.querySelector(".delete-icon").addEventListener("click", () => {
      handleDeleteQuestion(id, markedQuestions, updateMarkedQuestions);
                  flagIcon.classList.toggle(".flag-icon");

    });

    markedList.appendChild(li);
  });
}
//submit
submitAction();

// Initial display
displayQuestion(currentQuestionIndex);

