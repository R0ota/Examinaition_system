// Function to store the selected answer for a given question in local storage.
export function setAnswers(questionID, selectedAnswer) {
  // Retrieve the 'answers' object from local storage or initialize it if it doesn't exist.
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  // Update the 'answers' object with the new answer, using the questionID as the key.
  savedAnswers[questionID] = selectedAnswer;
  // Convert the updated 'answers' object back to a string and save it in local storage.
  localStorage.setItem("answers", JSON.stringify(savedAnswers));
}
// Function to retrieve the selected answer for a given question from local storage.
export function getAnswers(questionID) {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  return savedAnswers[questionID];
}
