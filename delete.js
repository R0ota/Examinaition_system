//delete.js
export function handleDeleteQuestion(
  questionId,
  markedQuestions,
  updateMarkedQuestions
) {
  // Remove the question from the marked list
  const updatedQuestions = markedQuestions.filter((id) => id !== questionId);
  updateMarkedQuestions(updatedQuestions);
}
