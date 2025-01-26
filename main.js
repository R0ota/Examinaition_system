import { questions } from "./questions.js";
import { createPagination } from "./pagination.js";
import { handleFlagQuestion } from "./flag.js";
import { handleDeleteQuestion } from "./delete.js";
import { timeDown } from "./timer.js";
import { submitAction } from "./submit.js";
import { displayQuestion } from "./displayQuestion.js";
import { updateMarkedQuestions } from "./markQuestion.js";

const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const markedList = document.querySelector(".marked-list");

let currentQuestionIndex = 0;
let markedQuestions = [];

// Start the timer
timeDown();

// Function to handle navigation between questions
function onNavigate(newIndex) {
  currentQuestionIndex = newIndex; // Update the current question index
  displayQuestion(currentQuestionIndex, questions, markedQuestions); // Display the new question
  createPagination(currentQuestionIndex, questions.length, onNavigate); // Update the pagination
}

// Initialize pagination
createPagination(currentQuestionIndex, questions.length, onNavigate);

// Display the first question
displayQuestion(currentQuestionIndex, questions, markedQuestions);

// Function to update marked questions
updateMarkedQuestions(markedQuestions);

// Handle submit action
submitAction();
