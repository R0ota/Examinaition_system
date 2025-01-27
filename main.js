import { questions } from "./questions.js";
import { createPagination } from "./pagination.js";
import { timeDown } from "./timer.js";
import { submitAction } from "./submit.js";
import { displayQuestion } from "./displayQuestion.js";

let currentQuestionIndex = 0;
let markedQuestions = [];

// Start the timer
timeDown();

// Function to handle navigation between questions
export function onNavigate(newIndex) {
  currentQuestionIndex = newIndex; // Update the current question index
  displayQuestion(currentQuestionIndex, questions, markedQuestions, onNavigate); // Display the new question
  createPagination(currentQuestionIndex, questions.length, onNavigate); // Update the pagination
}

// Initialize pagination
createPagination(currentQuestionIndex, questions.length, onNavigate);

// Display the first question
displayQuestion(currentQuestionIndex, questions, markedQuestions, onNavigate);

// Handle submit action
submitAction();
