import { createPagination } from "./pagination.js";
import { timeDown } from "./timer.js";
import { submitAction } from "./submit.js";
import { displayQuestion } from "./displayQuestion.js";

let currentQuestionIndex = 0; // Current question index
let markedQuestions = []; // Array of flagged questions
let questions = []; // Array to store fetched questions

// Fetch questions dynamically from JSON

async function fetchQuestions() {
  try {
    const response = await fetch("./questions.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

// Navigate between questions
export function onNavigate(newIndex) {
  currentQuestionIndex = newIndex; // Update the current index
  displayQuestion(currentQuestionIndex, questions, markedQuestions, onNavigate);
  createPagination(currentQuestionIndex, questions.length, onNavigate);
}

// Initialize the quiz application
async function initializeApp() {
  questions = await fetchQuestions();

  if (questions.length === 0) {
    console.error("No questions available.");
    return;
  }
  timeDown();
  createPagination(currentQuestionIndex, questions.length, onNavigate);
  displayQuestion(currentQuestionIndex, questions, markedQuestions, onNavigate);
  submitAction();
}

initializeApp();


