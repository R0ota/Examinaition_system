import { questions } from "./questions.js";
import { createPagination } from "./pagination.js";
import { handleFlagQuestion } from "./flag.js";
import { timeDown } from "./timer.js";
import { submitAction } from "./submit.js";
import { displayQuestion } from "./displayQuestion.js";
import { updateMarkedQuestions } from "./markQuestion.js";

// import{onNavigate} from "./pagination.js"
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const markedList = document.querySelector(".marked-list");

let currentQuestionIndex = 0;
let markedQuestions = [];

// Start the timer
timeDown();

// Function to handle navigation between questions
// onNavigate(newIndex);
export function onNavigate(newIndex) {
  currentQuestionIndex = newIndex; // Update the current question index
  displayQuestion(currentQuestionIndex, questions, markedQuestions); // Display the new question
  createPagination(currentQuestionIndex, questions.length, onNavigate); // Update the pagination
}

// Initialize pagination
createPagination(currentQuestionIndex, questions.length, onNavigate);

// Display the first question
displayQuestion(currentQuestionIndex, questions, markedQuestions);

// Function to update marked questions
updateMarkedQuestions(markedQuestions, onNavigate);

// Handle flagging a question
document.querySelector(".flag-icon ").addEventListener("click", () => {
  handleFlagQuestion(
    currentQuestionIndex + 1, // Pass the current question ID
    markedQuestions,
    (updatedList) => {
      markedQuestions = updatedList; // Update the marked questions array
      updateMarkedQuestions(markedQuestions, onNavigate); // Update the DOM
    }
  );
});

// Handle submit action
submitAction();
