//flag.js

export function handleFlagQuestion(
  questionId,
  markedQuestions,
  updateCallback
) {
  const updatedList = markedQuestions.includes(questionId)
    ? markedQuestions.filter((id) => id !== questionId)
    : [...markedQuestions, questionId];

  updateCallback(updatedList); // Update flagged questions
}
