export function handleFlagQuestion(
  questionId, // ID of the question to flag/unflag
  markedQuestions, // Array of currently flagged questions
  updateCallback // Function to update the flagged questions list
) {
  // Select the flag icon element
  // Add a click event listener to the flag icon
  // Check if the question is already flagged
  // Remove question from flagged list
  // Add question to flagged list
  // Call the provided callback function to update the flagged list
  //
  // Update the flag icon's appearance based on the updated flagged list
  // Add the "flagged" class to make it red
  // Remove the "flagged" class to reset color
  const flagIcon = document.querySelector(".flag-icon"); // Select the flag icon element

  // Add a click event listener to the flag icon
  flagIcon.addEventListener("click", () => {
    // Check if the question is already flagged
    const updatedList = markedQuestions.includes(questionId)
      ? markedQuestions.filter((id) => id !== questionId) // Remove question from flagged list
      : [...markedQuestions, questionId]; // Add question to flagged list

    // Call the provided callback function to update the flagged list
    updateCallback(updatedList);

    // Update the flag icon's appearance based on the updated flagged list
    if (updatedList.includes(questionId)) {
      flagIcon.classList.add("flagged"); // Add the "flagged" class to make it red
    } else {
      flagIcon.classList.remove("flagged"); // Remove the "flagged" class to reset color
    }
  });
}
