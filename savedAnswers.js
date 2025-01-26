//a file to save selected answers in local storage
// //savedAnswers.js
export function setAnswers(questionID, selectedAnswer) {
   // if there are prev saved answers get them
    const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    //update the selected saved ans.
    savedAnswers[questionID] = selectedAnswer;
    //save all in local storage
    localStorage.setItem("answers", JSON.stringify(savedAnswers));
}

export function getAnswers(questionID) {
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    return savedAnswers[questionID];
}

// calculate score
export function calculateScore(questions) {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  let score = 0;

  questions.forEach((question) => {
    const userAnswer = savedAnswers[question.id];
    const correctOption = question.options.find((option) => option.isCorrect);

    if (userAnswer === correctOption.id) {
      score += correctOption.score; // add score for the correct answer
    }
  });

  localStorage.setItem("score", score); // Store score once after calculating
  return score;
}
