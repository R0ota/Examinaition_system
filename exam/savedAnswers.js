export function setAnswers(questionID, selectedAnswer) {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  savedAnswers[questionID] = selectedAnswer;
  localStorage.setItem("answers", JSON.stringify(savedAnswers));
}

export function getAnswers(questionID) {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  return savedAnswers[questionID];
}
