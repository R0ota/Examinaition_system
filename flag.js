export function handleFlagQuestion(
  questionId,
  markedQuestions,
  updateMarkedQuestions
) {
  // Prevent duplicate flags
  if (!markedQuestions.includes(questionId)) {
    markedQuestions.push(questionId);
    updateMarkedQuestions();
  }
}
