// Function to calculate and return the total score of the quiz based on saved answers.
export function calculateScore(questions) {
  // Retrieve saved answers from local storage or initialize an empty object if none exist.
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  let score = 0; // Initialize score variable.

  // Iterate through each question object provided.
  questions.forEach((question) => {
    // Retrieve the user's answer to the current question using the question ID.
    const userAnswer = savedAnswers[question.id];
    // Find the option object that is marked as correct in the current question.
    const correctOption = question.options.find((option) => option.isCorrect);

    // If the user's answer matches the ID of the correct option, add its score to the total score.
    if (userAnswer === correctOption.id.toString()) {
      score += correctOption.score;
    }
  });

  // Store the calculated score in local storage for later use or display.
  localStorage.setItem("score", score);
  // Log the calculated score to the console for debugging.
  console.log(`score : ${score}`);

  // Return the total score.
  return score;
}
