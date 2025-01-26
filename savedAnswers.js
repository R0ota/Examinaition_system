//a file to save selected answers in local storage
// //savedAnswers.js

export function setAnswers(questionID, selectedAnswer , questions) {
  // if there are prev saved answers get them
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  //update the selected saved ans.
  savedAnswers[questionID] = selectedAnswer;
  //save all in local storage
  localStorage.setItem("answers", JSON.stringify(savedAnswers));
  const score = calculateScore(questions); // حساب السكور
  console.log("score: ", score); // عرض السكور في الكونسول
}

export function getAnswers(questionID) {
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    return savedAnswers[questionID];
}

export function calculateScore(questions) {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  let score = 0;

  // console.log("Saved Answers:", savedAnswers);
  // console.log("Questions:", questions);

  questions.forEach((question) => {
    const userAnswer = savedAnswers[question.id]; // Get user-selected answer
    // console.log("User Answer for Question", question.id, ":", userAnswer);

    const correctOption = question.options.find((option) => option.isCorrect);
    // console.log("Correct Option for Question", question.id, ":", correctOption);

    if (savedAnswers[question.id] === correctOption.id.toString()) {
      // console.log("Comparing:", savedAnswers[question.id], correctOption.id);
      // console.log("Correct Answer for Question", question.id);
      score += correctOption.score; // Add score for correct answers
    }
//  else {
//   console.log("Wrong Answer for Question", question.id);
// }
  });

  console.log("Final Calculated Score:", score);
  localStorage.setItem("score", score); // Store score after calculation
  return score;
}

