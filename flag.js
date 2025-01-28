export function toggleFlag(
  questionId,
  markedQuestions,
  updateCallback,
  flagElement
) {
  const isFlagged = markedQuestions.includes(questionId);

  const updatedList = isFlagged
    ? markedQuestions.filter((id) => id !== questionId)   
    : [...markedQuestions, questionId];   

  updateCallback(updatedList);

  if (flagElement) {
    flagElement.classList.toggle("flagged", !isFlagged);
  }

  if (isFlagged) {
    const markedListElement = document.querySelector(".marked-list");
    const listItem = markedListElement.querySelector(
      `[data-id="${questionId}"]`
    );
    if (listItem) {
      listItem.remove();
    }
  }
}
