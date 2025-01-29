// Import required modules for different functionalities
import { createPagination } from "./pagination.js"; // Handles pagination (next/prev buttons)
import { timeDown } from "./timer.js"; // Handles countdown timer
import { submitAction } from "./submit.js"; // Handles quiz submission
import { displayQuestion } from "./displayQuestion.js"; // Displays questions dynamically

//  Define global variables
let currentQuestionIndex = 0; // Current active question index
let markedQuestions = []; // Array to store flagged (marked) questions
let questions = []; // Array to store fetched questions

//  Fetch questions dynamically from the JSON file
async function fetchQuestions() {
  try {
    // Request the questions.json file
    const response = await fetch("./questions.json");

    // If fetching fails, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }

    // Convert the response to JSON and return it
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // Return an empty array if fetching fails
  }
}

//  Navigate between questions
export function onNavigate(newIndex) {
  currentQuestionIndex = newIndex; // Update the current question index

  //  Retrieve marked questions from localStorage when navigating
  markedQuestions = JSON.parse(localStorage.getItem("markedQuestions")) || [];

  //  Display the new question and update the flag state
  displayQuestion(currentQuestionIndex, questions, markedQuestions, onNavigate);

  //  Update pagination buttons (next/previous)
  createPagination(currentQuestionIndex, questions.length, onNavigate);
}

//  Initialize the quiz application
async function initializeApp() {
  // Fetch questions from JSON
  questions = await fetchQuestions();

  // If no questions are available, show an error and exit
  if (questions.length === 0) {
    console.error("No questions available.");
    return;
  }

  //  Start the countdown timer
  timeDown();

  // Set up pagination controls
  createPagination(currentQuestionIndex, questions.length, onNavigate);

  //  Display the first question
  displayQuestion(currentQuestionIndex, questions, markedQuestions, onNavigate);

  //  Handle quiz submission logic
  submitAction(questions);
}

//  Call the initialization function when the script loads
initializeApp();

//  Update flag status when the page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    //  Loop through all flag icons and update their status
    document.querySelectorAll(".flag-icon").forEach((flagIcon) => {
      const questionId = parseInt(flagIcon.getAttribute("data-id"));

      //  If the question is in the flagged list, keep it red, otherwise make it blue
      flagIcon.classList.toggle(
        "flagged",
        markedQuestions.includes(questionId)
      );
    });
  }, 100);
});
