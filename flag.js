export function toggleFlag(
  questionId,
  markedQuestions,
  updateCallback,
  flagElement
) {
  //  Check if the question is already flagged (marked)
  const isFlagged = markedQuestions.includes(questionId);

  //  Update the list:
  // - If already flagged, remove it
  // - If not flagged, add it to the list
  const updatedList = isFlagged
    ? markedQuestions.filter((id) => id !== questionId) //  Remove the question
    : [...markedQuestions, questionId]; //  Add the question

  //  Save the updated flagged list in localStorage
  localStorage.setItem("markedQuestions", JSON.stringify(updatedList));

  //  Update the UI with the new list
  updateCallback(updatedList);

  //  Toggle the flag color:
  // - If the question was removed, make the flag blue (default)
  // - If the question was added, make the flag red
  if (flagElement) {
    flagElement.classList.toggle("flagged", !isFlagged);
  }

  //  If the question was removed from flagged list, also remove it from the displayed marked list
  if (isFlagged) {
    const markedListElement = document.querySelector(".marked-list");
    const listItem = markedListElement.querySelector(
      `[data-id="${questionId}"]`
    );
    if (listItem) {
      listItem.remove(); //  Remove it from the marked questions list in UI
    }
  }
}
