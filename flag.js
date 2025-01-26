//flag.js

export function handleFlagQuestion(
  questionId,
  markedQuestions,
  updateCallback
) {
  // Create a new array, updatedList, by checking if the questionId is in markedQuestions
  // If it is, remove it from the array (unflagging the question)
  // If it's not, add it to the array (flagging the question)

  const updatedList = markedQuestions.includes(questionId)
    ? markedQuestions.filter((id) => id !== questionId)
    : [...markedQuestions, questionId];

  updateCallback(updatedList); // Update flagged questions
}
